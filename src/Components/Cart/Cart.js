import React, { Component} from 'react'
import './Cart.css'
import { connect } from 'react-redux'
import { getCart } from '../../redux/reducers/cartReducer'
import { getUser } from '../../redux/reducers/userReducer'

class Cart extends Component {
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
                                        <h3>QTY: {quantity}</h3>
                                        <h5 style={{marginTop: '25px'}}>Change <br /> Quantity</h5>
                                        <h5>&#128465;</h5>
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
                    <h3>Continue to Checkout</h3>
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

export default connect(mapStateToProps, { getUser, getCart })(Cart)