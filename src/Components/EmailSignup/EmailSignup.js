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
            <div className="email-signup-full">
                <div className="email-signup">
                    <div className="email-signup-container">
                        <h1 style={{paddingTop: '40px'}}>Don't Miss A Beat</h1>
                        <h5 style={{paddingBottom: '40px'}}>Sign up to receive exclusive updates and offers</h5>
                        <div className="email-input">
                            <input className="email-signup-box" onChange={this.handleChange} placeholder="Enter Email Here" />
                            <h1 style={{fontSize: '65px', marginBottom: '3px'}}>&#9993;</h1>
                        </div>
                    </div>
                    <div className="follow-us-container">
                        <h1>Follow Us</h1>
                        <h3>#poweryourpassion</h3>
                        <div className="social-links">
                        <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-youtube"></i>
                            <i className="fab fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailSignup