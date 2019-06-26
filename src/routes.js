import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import ProductsContainer from './Components/ProductsContainer/ProductsContainer'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={ProductsContainer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
    </Switch>
)