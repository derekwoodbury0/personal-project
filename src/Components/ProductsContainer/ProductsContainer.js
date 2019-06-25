import React from 'react'
import Products from '../Products/Products'
import Product from '../Product/Product'
import { Switch, Route } from 'react-router-dom'

export default function ProductsContainer (props) {
    return (
        <Switch>
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={Product} />
        </Switch>
    )
}