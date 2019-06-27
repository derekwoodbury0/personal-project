import React, { Component } from 'react'
import './Header.css'
import logo from './jaybird-small.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer'
import { logout } from '../../redux/reducers/userReducer'
import { clearCart } from '../../redux/reducers/cartReducer'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMenu: false
        }
    }

    componentDidMount() {
       this.props.getUser()
    }

    toggleMenu = () => {
        this.setState ({ showMenu: !this.state.showMenu })
    }

    logout = async () => {
        await this.props.logout()
        this.props.clearCart()
        this.props.history.push("/")
        this.setState ({ showMenu: false })
    }

    render() {
        return (
            <div>
                <div className="full-header">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo" />
                    </Link>

                    <div className="nav-links-full-page">
                        <Link to="/products">
                            <h2 style={{color: 'white'}}>Products</h2>
                        </Link>
                        <h2 style={{color: 'white'}}>Support</h2>
                        {this.props.user ?
                            <h2 onClick={() => this.logout()} style={{color: 'white'}}>Logout</h2>
                            :
                            <Link to="/login">
                                <h2 style={{color: 'white'}}>Login</h2>
                            </Link>
                        }
                    </div>

                    <div className="cart-menu-container">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart" style={{fontSize: '35px', color: 'white'}}></i>
                        </Link>
                        <h1 
                            className="menu-icon"
                            onClick={this.toggleMenu}
                            >&#9776;</h1>
                    </div>
                    { this.state.showMenu ?
                        <div className="dropdown-menu">
                            <Link to="/">
                                <div className="dropdown-menu-links" onClick={this.toggleMenu}>Home</div>
                            </Link>
                            <Link to="/products">
                                <div className="dropdown-menu-links" onClick={this.toggleMenu}>Products</div>
                            </Link>
                            {this.props.user ?
                                <div onClick={() => this.logout()}>Logout</div>
                                :
                                <Link to="/login">
                                    <div className="dropdown-menu-links" onClick={this.toggleMenu}>Login</div>
                                </Link>
                            }
                        </div>
                        :
                        null
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.data
    }
}

export default connect(mapStateToProps, { getUser, logout, clearCart })(withRouter(Header))