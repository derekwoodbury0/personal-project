import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import logo from './full-logo.jpg'

function Footer() {
    return (
        <div className="footer">
            <img className="footer-logo" src={logo} alt="" width="304" />
            <div className="footer-links-container">
                <div className="footer-text-top-half">
                    <Link to="/products" style={{color: 'white'}}>
                        <h3>Shop</h3>
                    </Link>
                    <Link to="/support" >
                        <h3 className="footer-support" style={{color: 'white'}}>Support</h3>
                    </Link>
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

export default Footer