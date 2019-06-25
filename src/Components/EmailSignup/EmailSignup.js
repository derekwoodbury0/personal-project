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
        console.log(this.state)
    }

    render() {
        return (
            <div className="email-signup">
                <div className="email-signup-container">
                    <h1>Don't Miss A Beat</h1>
                    <h5>Sign up to receive exclusive updates and offers</h5>
                    <div>
                        <input onChange={this.handleChange} placeholder="enter email" />
                        <button>Signup</button>
                    </div>
                    <h1>Follow Us</h1>
                    <h3>#poweryourpassion</h3>
                </div>
            </div>
        )
    }
}

export default EmailSignup