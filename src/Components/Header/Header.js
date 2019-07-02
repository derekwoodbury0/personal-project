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
            cartQuantity: 0
        }
    }

    async componentDidMount() {
       await this.props.getUser()
       await this.props.getCart()
       this.getCartQuantity()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.getCartQuantity()
        }
    }

    toggleMenu = () => {
        this.setState ({ showMenu: !this.state.showMenu })
    }

    logout = async () => {
        await this.props.logout()
        this.props.clearCart()
        this.props.history.push("/")
        this.setState ({ showMenu: false, cartQuantity: 0 })
        this.componentDidMount()
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
                            <h2 style={{color: 'white'}}>Products</h2>
                        </Link>
                        <h2 style={{color: 'white'}}>Support</h2>
                        {this.props.isAdmin ?
                        <Link to="/admin">
                            <h2 style={{color: 'white'}}>Admin</h2>
                        </Link>
                        :
                        null
                        }
                        {this.props.user ?
                            <Link to="/user">
                                <h2 style={{color: 'white'}}>Account</h2>
                            </Link>
                            :
                            null
                        }
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
                            {this.state.cartQuantity ?
                                <div className="cart-quantity">{this.state.cartQuantity}</div>
                                :
                                null
                            }
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
                            <div>Support</div>
                            {this.props.isAdmin ?
                                <Link to="/admin">
                                    <div style={{color: 'white'}} onClick={this.toggleMenu}>Admin</div>
                                </Link>
                                :
                                null
                            }
                            { this.props.user ?
                                <div style={{color: 'white'}}>Account</div>
                                :
                                null
                            }
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
        user: state.userReducer.data,
        isAdmin: state.userReducer.isAdmin,
        cart: state.cartReducer.data
    }
}

export default connect(mapStateToProps, { getUser, logout, clearCart, getCart })(withRouter(Header))