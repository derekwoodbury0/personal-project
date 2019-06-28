import React, { Component } from 'react'
import './EmailSignup.css'
import axios from 'axios'

class EmailSignup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            submit: false
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    handleClick = () => {
        if (this.state.email !== '' && this.state.name !== '') {
            axios.post('/email/send', this.state)
            this.setState ({ name: '', email: '', submit: true})
        } else {
            alert('Please enter name and email')
        }
    }

    render() {
        return (
            <div className="email-signup-full">
                <div className="email-signup">
                    <div className="email-signup-container-left-side">
                        <div className="email-signup-container">
                            <h1 style={{paddingTop: '40px'}}>Don't Miss A Beat</h1>
                            <h5 style={{paddingBottom: '40px'}}>Sign up to receive exclusive updates and offers</h5>
                        </div>
                        <div className="email-input">
                            <input 
                                className="email-signup-box" 
                                onChange={this.handleChange} 
                                placeholder="Enter Name" 
                                name="name"
                                value={this.state.name}
                                autoComplete="off"
                                />
                            <input 
                                className="email-signup-box" 
                                onChange={this.handleChange} 
                                placeholder="Enter Email Here" 
                                name="email"
                                value={this.state.email}
                                autoComplete="off"
                                />
                            {this.state.submit ?
                            <h1 className="email-submitted-check">&#10003;</h1>
                            :
                            <h1 
                            className="email-submit-button"
                            onClick={this.handleClick}
                            >
                                    &#9993;</h1>
                            }
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