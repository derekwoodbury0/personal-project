import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Register.css'

import { register } from '../../redux/reducers/userReducer'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    handleClick = () => {
        let { name, email, password } = this.state

        this.props.register({ name, email, password })
        this.props.history.push('/')
    }
    
    render() {
        console.log(this.props)
        return (
            <div className="register-page">
                <h1>Register</h1>
                <div className="register-container">
                    <div className="register-text-container">
                        <input
                            placeholder="Name"
                            name="name"
                            onChange={this.handleChange}
                            type="text"
                            />
                        <input
                            placeholder="email address"
                            name="email"
                            onChange={this.handleChange}
                            type="text"
                            />
                        <input 
                            placeholder="password"
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            />
                        <button onClick={this.handleClick}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { register })(Register)