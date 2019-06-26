import React, { Component} from 'react'
import './Cart.css'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'
import { updateCart, getCart, removeFromCart } from '../../redux/reducers/cartReducer'
import StripeCheckout from 'react-stripe-checkout'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleChangeQuantity: false,
            updatedQuantity: ''
        }
    }

    toggleChange = () => this.setState ({ toggleChangeQuantity: !this.state.toggleChangeQuantity})

    handleQuantityChange = e => {
        this.setState ({ updatedQuantity: e.target.value })
    }

    changeQuantity = (id) => {
        let { updatedQuantity } = this.state
        this.toggleChange()
        this.props.updateCart(id, {updatedQuantity})
    }

    removeFromCart = id => {
        this.props.removeFromCart(id)
        this.props.getCart()
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                <div style={{height: '75px'}}></div>
                <div className="cart-header">
                    <h1>Your Shopping Cart</h1>
                </div>
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
                                        {this.state.toggleChangeQuantity ? 
                                            <div>
                                                <h3>QTY:</h3>
                                                <input type="number" min="1" max="10" 
                                                    onChange={this.handleQuantityChange}
                                                />
                                                <h5 onClick={() => this.changeQuantity(product_id)} 
                                                    style={{marginTop: '25px'}}
                                                    >Save
                                                </h5>
                                                <h5 onClick={() => this.toggleChange()}>Cancel</h5>
                                            </div>
                                            
                                            :
                                            <div>
                                                <h3>QTY: {quantity}</h3>
                                                <h5 onClick={() => this.toggleChange()} style={{marginTop: '25px'}}>Change <br /> Quantity</h5>
                                            </div>
                                        }
                                        <h5 onClick={() => this.removeFromCart(product_id)}>&#128465;</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="subtotal-full-container">
                    <div className="subtotal-container">
                        <h2>Subtotal</h2>
                        <h4>$TBD</h4>
                    </div>
                </div>
                <div className="checkout-container">
                    <StripeCheckout 
                        label="Checkout Now" 
                        name="Jaybird Checkout"
                    />
                </div>
            </div>
            )
    }
}

const mapStateToProps = state => {
    return {
      user: state.userReducer.data,
      cart: state.cartReducer.data
    }
  }

export default connect(mapStateToProps, { getUser, getCart, updateCart, removeFromCart })(Cart)