import React, { Component } from 'react'
import './Header.css'
import logo from './jaybird-small.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser, logout } from '../../redux/reducers/userReducer'
import { clearCart, getCart } from '../../redux/reducers/cartReducer'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMenu: false,
            showSettingsMenu: false,
            cartQuantity: 0
        }
    }

    // componentDidMount() {
    //     this.getCart()
    // }
    
    // getCart = async() => {
    //     await this.props.getUser()
    //    this.props.user && await this.props.getCart()
    //    this.getCartQuantity()
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.getCartQuantity()
        }
    }

    toggleMenu = () => {
        this.setState ({ showMenu: !this.state.showMenu })
    }

    toggleSettingsMenu = () => {
        this.setState ({ showSettingsMenu: !this.state.showSettingsMenu })
    }

    logout = async () => {
        await this.props.logout()
        this.props.clearCart()
        this.props.history.push("/")
        this.setState ({ showMenu: false, cartQuantity: 0 })
    }

    getCartQuantity() {
        let sum = 0
        
        this.props.cart.forEach(function(product){
            sum += +product.quantity
        })
        this.setState ({ cartQuantity: sum })
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
                            <h2 className="nav-link">Products</h2>
                        </Link>
                        <Link to="/support">
                            <h2 className="nav-link">Support</h2>
                        </Link>
                        {this.props.user ?
                                <h2 onClick={() => this.logout()} className="nav-link">Logout</h2>
                            :
                            <Link to="/login">
                                <h2 style={{color: 'white'}}>Login</h2>
                            </Link>
                        }
                    </div>

                    <div className="cart-menu-container">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart" style={{fontSize: '35px', color: 'white'}}></i>
                            {this.state.cartQuantity ?
                                <div className="cart-quantity">{this.state.cartQuantity}</div>
                                :
                                null
                            }
                        </Link>
                        <div className="settings-link" onClick={this.toggleSettingsMenu}>&#9660;</div>
                        <h1 
                            className="menu-icon"
                            onClick={this.toggleMenu}
                            >&#9776;</h1>
                    </div>
                    {this.state.showSettingsMenu  && this.props.user ? 
                        <div className="settings-dropdown">
                            <Link to="/user">
                                <div className="nav-link" onClick={this.toggleSettingsMenu}>Account</div>
                            </Link>
                            {this.props.isAdmin ?
                                <Link to="/admin">
                                    <div className="nav-link" onClick={this.toggleSettingsMenu}>Admin</div>
                                </Link>
                                :
                                null
                            }
                        </div> 
                        :
                        null   
                    }
                    { this.state.showMenu ?
                        <div className="dropdown-menu">
                            <Link to="/">
                                <div className="nav-link" onClick={this.toggleMenu}>Home</div>
                            </Link>
                            <Link to="/products">
                                <div className="nav-link" onClick={this.toggleMenu}>Products</div>
                            </Link>
                            <Link to="/support">
                                <div className="nav-link" onClick={this.toggleMenu}>Support</div>
                            </Link>
                            {this.props.isAdmin ?
                                <Link to="/admin">
                                    <div className="nav-link" onClick={this.toggleMenu}>Admin</div>
                                </Link>
                                :
                                null
                            }
                            { this.props.user ?
                                <Link to="/user">
                                    <div className="nav-link" onClick={this.toggleMenu}>Account</div>
                                </Link>
                                :
                                null
                            }
                            {this.props.user ?
                                <div onClick={() => this.logout()}>Logout</div>
                                :
                                <Link to="/login">
                                    <div className="nav-link" onClick={this.toggleMenu}>Login</div>
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
        user: state.userReducer.data,
        isAdmin: state.userReducer.isAdmin,
        cart: state.cartReducer.data
    }
}

export default connect(mapStateToProps, { getUser, logout, clearCart, getCart })(withRouter(Header))