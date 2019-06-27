import React, { Component } from 'react'
import './Footer.css'
import logo from './full-logo.jpg'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <img className="footer-logo" src={logo} alt="" width="304" />
                <div className="footer-links-container">
                    <div className="footer-text-top-half">
                        <h3>Shop</h3>
                        <h3 className="footer-support">Support</h3>
                    </div>
                    <div className="footer-text-bottom-half">
                        <h5>Compliance Certificates</h5>
                        <h5>Terms & Conditions</h5>
                        <h5>Privacy Policy</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer