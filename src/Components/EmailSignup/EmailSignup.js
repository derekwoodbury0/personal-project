import React, { Component } from 'react'
import './EmailSignup.css'

class EmailSignup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: []
        }
    }

    handleChange = (e) => {
        this.setState ({ email: e.target.value })
    }

    render() {
        return (
            <div className="email-signup">
                <div className="email-signup-container">
                    <h1>Don't Miss A Beat</h1>
                    <h5 style={{textAlign: 'left'}}>Sign up to receive exclusive updates and offers</h5>
                    <div className="email-input">
                        <input style={{height: '30px', width: '200px'}} onChange={this.handleChange} placeholder="Enter Email Here" />
                        <h1 style={{fontSize: '65px', marginBottom: '3px'}}>&#9993;</h1>
                    </div>
                    <h1>Follow Us</h1>
                    <h3>#poweryourpassion</h3>
                    <div className="social-links">
                    <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-youtube"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailSignup