import React, { Fragment } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const stripeBtn = () => {
    const publishableKey = 'pk_test_p5LKYrMic9dlPuOaQAPsFIrJ000DVkAh5R'

    const onToken = token => {
        const body = {
            amount: 999,
            token: token
        }
    }
    
    return (
        <StripeCheckout
        label="Checkout Now"
        name="Jaybird Checkout"
        token = {this.onToken}
        stripeKey={this.publishableKey}
        />
        )
    }

export default stripeBtn