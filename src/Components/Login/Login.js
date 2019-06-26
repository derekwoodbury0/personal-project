import React, { Component } from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../redux/reducers/userReducer'
import { getCart } from '../../redux/reducers/cartReducer'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    handleClick = async () => {
        let { email, password } = this.state

        await this.props.login({ email, password })
        this.props.getCart()
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div className="login-page">
                <h1>Login</h1>
                <div className="login-container">
                    <div className="login-text-container">
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
                        <button onClick={this.handleClick}>Login</button>
                    </div>
                    <div className="register-container">
                        <h6>Don't Have An Account?</h6>
                        <Link to="/register">
                            <button>Register Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { login, getCart })(Login)