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

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
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
app.put('/api/refund/:id', payCtrl.refund)

app.post('/api/orders/create', orderCtrl.completeOrder)

app.get('/api/admin/orders', adminCtrl.getOrders)
app.get('/api/admin/users', adminCtrl.getUsers)
app.put('/api/admin/changeadmin', adminCtrl.changeAdmin)
app.delete('/api/admin/deleteuser/:id', adminCtrl.deleteUser)

app.get('/api/sign-s3', userCtrl.uploadToAmazon)
app.put('/api/upload', userCtrl.uploadPhoto)
app.put('/api/updateuser', userCtrl.updateUser)

app.post('/api/support', emailCtrl.supportEmail, textCtrl.sendText)