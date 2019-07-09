let express = require('express')
let app = express()
let massive = require('massive')
require('dotenv').config()
let authCtrl = require('./controllers/authCtrl')
let session = require('express-session')
let productsCtrl = require('./controllers/productsCtrl')
let cartCtrl = require('./controllers/cartCtrl')
let emailCtrl = require('./controllers/emailCtrl')
let payCtrl = require('./controllers/payCtrl')
let orderCtrl = require('./controllers/orderCtrl')
let adminCtrl = require('./controllers/adminCtrl')
let userCtrl = require('./controllers/userCtrl')
let textCtrl = require('./controllers/textCtrl')
let socket = require('socket.io')
let { urlencoded } = require('body-parser')
let messages = []

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use( express.static( `${__dirname}/../build` ) )

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)))

    io.on('connection', (client) => {
        console.log('new guy')
        client.on('subscribeToTimer', (interval) => {
            setInterval(() => {
                client.emit('messages', messages)
            }, interval)
        })
        client.on('sendMessage', (message) => {
            console.log('message received', message)
            messages.push(message)
            io.emit('emittedMessage', messages)
            console.log(messages)
        })
    })
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
    console.log(req.body.From)
    if (req.body.From === '+18017838409' && req.body.Body === 'Clear') {
        messages = []
    } else if (req.body.From === '+18017838409') {
        messages.push(req.body.Body)
    }
    res.sendStatus(200)
});

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentUser', authCtrl.currentUser)

app.get('/api/products', productsCtrl.getAllProducts)
app.get('/api/products/:id', productsCtrl.getProduct)

app.post('/api/cart/:id', cartCtrl.addToCart)
app.get('/api/getcart', cartCtrl.getCart)
app.put('/api/cart/update/:id', cartCtrl.updateQuantity)
app.delete('/api/cart/remove/:id', cartCtrl.removeFromCart)

app.post('/email/send', emailCtrl.sendEmail)
app.post('/api/email/supportemail', emailCtrl.supportEmail)

app.post('/api/payment', payCtrl.pay)
app.put('/api/refund/', payCtrl.refund)

app.post('/api/orders/create', orderCtrl.completeOrder)

app.get('/api/admin/orders', adminCtrl.getOrders)
app.get('/api/admin/users', adminCtrl.getUsers)
app.put('/api/admin/changeadmin', adminCtrl.changeAdmin)
app.delete('/api/admin/deleteuser/:id', adminCtrl.deleteUser)

app.get('/api/sign-s3', userCtrl.uploadToAmazon)
app.put('/api/upload', userCtrl.uploadPhoto)
app.put('/api/updateuser', userCtrl.updateUser)

app.post('/api/support', emailCtrl.supportEmail)
app.post('/api/newslettertext', textCtrl.sendTextOut)
app.post('/api/chattext', textCtrl.chatText)