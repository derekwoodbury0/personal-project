import React, { Component } from 'react'
import './Checkout.css'
import StripeCheckout from 'react-stripe-checkout'

class Checkout extends Component {


    render() {
        return (
            <div className="checkout-page">
                <div style={{height: '75px'}}></div>
                <h1>CheckoutPage</h1>
                <div className="checkout-container">
                    <StripeCheckout 
                        label="Checkout Now"
                    />
                </div>
            </div>
        )
    }
}

export default Checkout