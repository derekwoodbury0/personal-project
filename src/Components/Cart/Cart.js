import React, { Component} from 'react'
import './Cart.css'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'
import { updateCart, getCart, removeFromCart } from '../../redux/reducers/cartReducer'
import StripeCheckout from 'react-stripe-checkout'
import Loader from '../Loader/Loader'
import axios from 'axios'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0
        }
    }

    async componentDidMount() {
            this.getCart()
            this.getTotal()
    }

    getCart = async () => {
        await this.props.getCart()
        this.getTotal()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.total !== this.state.total) {
            this.getTotal()
        }
    }
    
    changeQuantity = async (id, e) => {
        let { value } = e.target
        let updatedQuantity = +value
        await this.props.updateCart(id, {updatedQuantity})
        this.getTotal()
    }

    removeFromCart = async id => {
        await this.props.removeFromCart(id)
        await this.props.getCart()
        this.getTotal()
    }

    getTotal() {
        let sum = 0
        
        this.props.cart.forEach(function(product) {
            sum += +product.price * +product.quantity
        })
        this.setState ({ total: sum })
    }

    onToken = async (token) => {
        let { total } = this.state
        let totalCents = total * 100
        token.card = void 0
        axios.post('/api/payment', {token, amount: totalCents })
        await axios.post('/api/orders/create')
        this.props.getCart()
        this.props.history.push('/confirmation')
    }
    
    render() {
        return (
            <div className="full-cart">
                <div style={{height: '75px'}}></div>
                    {this.props.user && this.props.cartLoading ?
                    <div className="cart-header">
                        <div className="loader-container"><Loader /></div>
                    </div>
                    :
                    this.props.cart[0] && this.props.user ?
                    <div className="cart-header">
                        <h1>Your Shopping Cart</h1>
                    </div>
                    :
                    this.props.user ?
                    <div className="cart-header empty-cart">
                        <h1>Your Cart Is Currently Empty</h1>
                    </div>
                    :
                    <div className="cart-header empty-cart">
                        <h1>Please Log In To View Cart</h1>
                    </div>
                }
                    {this.props.cartLoading ? null 
                    :
                    <div>
                        {this.props.cart.map(product => {
                            let {product_name, product_id, image_url, price, quantity} = product
                            return (
                                <div key={product_id} className="cart-product-container">
                                    <div className="cart-product">
                                        <img src={image_url} alt="" height="150" width="99" />
                                        <div className="cart-product-info-container">
                                            <h3>{product_name}</h3>
                                            <h5 style={{marginBottom: '40px'}}>Wireless <br />Headphones</h5>
                                            <h4>${price}</h4>
                                        </div>
                                        <div className="cart-product-quantity-container">
                                                <div>
                                                    <h3>QTY: <select style={{background: 'white'}} defaultValue={quantity} onChange={(event) => this.changeQuantity(product_id, event)}>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                    </select></h3>
                                                </div>
                                            <h5 style={{fontSize: '25px'}} onClick={() => this.removeFromCart(product_id)}>&#128465;</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    }
                <div className="subtotal-full-container">
                    <h5 style={{color: 'gray', paddingTop: '50px', textDecoration: 'underline'}}>Add Promo Code</h5>
                    <div className="subtotal-container">
                        <h2>Subtotal</h2>
                        <h4>${this.state.total}</h4>
                    </div>
                </div>
                {this.props.user && this.props.cart[0] ?
                    <div className="checkout-container">
                        <StripeCheckout 
                            label="Checkout Now" 
                            name="Jaybird Checkout"
                            amount={this.state.total * 100 }
                            token={this.onToken}
                            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                            currency='USD'
                            allowRememberMe = {false}
                            locale="en"
                            zipCode={true}
                            >
                        </StripeCheckout>
                    </div>
                    :
                    null
                }
            </div>
            )
    }
}

const mapStateToProps = state => {
    return {
      user: state.userReducer.data,
      cart: state.cartReducer.data,
      cartLoading: state.cartReducer.loading
    }
  }

export default connect(mapStateToProps, { getUser, getCart, updateCart, removeFromCart })(Cart)