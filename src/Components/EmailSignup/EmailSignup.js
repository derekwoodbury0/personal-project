import React, { Component } from 'react'
import './EmailSignup.css'
import axios from 'axios'

class EmailSignup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            number: '',
            submit: false,
            checked: false
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    handleClick = () => {
        let {name, number, email } = this.state
        if (email && name) {
            axios.post('/email/send', this.state)
            
            if (this.state.checked) {
                axios.post('/api/newslettertext', {name, number})
            }
            this.setState ({ name: '', email: '', submit: true, number: '', checked: false})
        } else {
            alert('Please enter name and email')
        }
    }
        
    keyPressed = (e) => {
        if (e.key === 'Enter') {
            this.handleClick()
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
                                placeholder="Name" 
                                name="name"
                                value={this.state.name}
                                autoComplete="off"
                                />
                            <input 
                                className="email-signup-box" 
                                onChange={this.handleChange} 
                                placeholder="Email " 
                                name="email"
                                value={this.state.email}
                                autoComplete="off"
                                onKeyPress={event => this.keyPressed(event)}
                                />
                                <input 
                                className="email-signup-box"
                                type="number" 
                                onChange={this.handleChange} 
                                placeholder="Phone Number(Optional)" 
                                name="number"
                                value={this.state.number}
                                autoComplete="off"
                                onKeyPress={event => this.keyPressed(event)}
                                />
                            {this.state.submit ?
                            <h1 className="email-submitted-check">&#10003;</h1>
                            :
                            <div className="submit-button-container">
                                <h1 
                                className="email-submit-button"
                                onClick={this.handleClick}
                                >&#9993;</h1>
                                <div className="checkbox-container">
                                    <input type="checkbox"  
                                        id="checkbox"
                                        autoComplete="off"
                                        onChange={(e) => this.setState({ checked: e.target.checked})}/>
                                        <label htmlFor="checkbox" 
                                            style={{fontSize: '13px', letterSpacing: '-.5px'}}>
                                            &nbsp; Allow Texts From Us
                                        </label>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="follow-us-container">
                        <h1>Follow Us</h1>
                        <h3>#poweryourpassion</h3>
                        <div className="social-links">
                        <a href="https://www.facebook.com/JaybirdSport/" target="_blank" 
                            rel="noopener noreferrer">
                                <i className="fab fa-facebook-f" style={{color: 'white'}}></i>
                        </a>
                        <a href="https://www.twitter.com/jaybirdsport/" target="_blank"
                            rel="noopener noreferrer">
                                <i className="fab fa-twitter" style={{color: 'white'}}></i>
                        </a>
                        <a href="https://www.youtube.com/user/JayBirdSport" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-youtube" style={{color: 'white'}}></i>
                        </a>
                        <a href="https://www.instagram.com/jaybirdsport/?hl=en" target="_blank"
                            rel="noopener noreferrer">
                                <i className="fab fa-instagram" style={{color: 'white'}}></i>
                        </a>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailSignup