import React from 'react'
import './Confirmation.css'

export default function Confirmation() {
    return (
        <div className="confirmation-page">
                <div style={{height: '75px'}}></div>
            <div className="confirmation-page-text-container">
                <h1>Thanks For Your Order!</h1>
                <h3>Check your email for confirmation and receipt.</h3>
            </div>
        </div>
    )
}