import React, { Component } from 'react'
import './Support.css'
import axios from 'axios';

class Support extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            message: '',
            submitted: false
        }
    }

    submitted = () => {
        this.setState ({ submitted: true })
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    handleClick = () => {
        let { name, email, message } = this.state

        if (name && email && message) { 
            axios.post('/api/support', {name, email, message})
            this.submitted()
        } else {
            return alert('please make sure name, email, and message are filled in before submitting')
        }
    }

    render() {
        return (
            <div className="support-page">
                <div style={{height: '75px'}}></div>
                <div className="support-header">
                    <h1>Contact Jaybird Support</h1>
                    <h3>We're Here To Help</h3>
                </div>
                {this.state.submitted ?
                <div className="support-submitted">
                    <h1>Thank you! A representative will be in touch with you shortly.</h1>
                </div>
                :
                <div>
                    <div className="support-main-full-screen">
                        <div className="support-inputs-container">
                            <h2>Send Us An Email</h2>
                            <input 
                                className="support-inputs" 
                                placeholder="Enter Name" 
                                name="name"
                                onChange={this.handleChange}
                            />
                            <input 
                                className="support-inputs" 
                                placeholder="Enter Email" 
                                name="email"
                                onChange={this.handleChange}
                            />
                            <textarea 
                                placeholder="Enter Questions Or Comments Here" 
                                name="message"
                                onChange={this.handleChange}    
                            />
                            <button onClick={this.handleClick}>Submit</button>
                        </div>
                        <img src="https://pbs.twimg.com/media/DQzdmwfVoAABcUY.jpg" alt="" height="400" width="300"/>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default Support