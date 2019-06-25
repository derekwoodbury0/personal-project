let express = require('express')
let app = express()
let massive = require('massive')
require('dotenv').config()
let authCtrl = require('./controllers/authCtrl')
let session = require('express-session')
let productsCtrl = require('./controllers/productsCtrl')
let cartCtrl = require('./controllers/cartCtrl')

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