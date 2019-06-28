import React, { Component} from 'react'
import './Cart.css'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'
import { updateCart, getCart, removeFromCart } from '../../redux/reducers/cartReducer'
import StripeCheckout from 'react-stripe-checkout'
import Loader from '../Loader/Loader'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // toggleChangeQuantity: false,
            // updatedQuantity: '',
            total: 0
        }
    }

    componentDidMount() {
        this.getCart()
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

    // toggleChange = () => this.setState ({ toggleChangeQuantity: !this.state.toggleChangeQuantity})

    // handleQuantityChange = e => {
    //     this.setState ({ updatedQuantity: e.target.value })
    // }
    
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
    
    render() {
        return (
            <div className="full-cart">
                <div style={{height: '75px'}}></div>
                <div className="cart-header">
                    {this.props.cart[0] ?
                    <h1>Your Shopping Cart</h1>
                    :
                    <h1>Your Cart Is Currently Empty</h1>
                }
                </div>
                {this.props.cartLoading ? <div className="loader-container"><Loader /></div> : 
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
                                            {/* {this.state.toggleChangeQuantity ? 
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
                                                
                                                : */}
                                                <div>
                                                    {/* <h3>QTY: {quantity}</h3> */}
                                                    <h3>QTY: <select defaultValue={quantity} onChange={(event) => this.changeQuantity(product_id, event)}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                    </select></h3>
                                                    {/* <h5 onClick={() => this.toggleChange()} style={{marginTop: '25px'}}>Change <br /> Quantity</h5> */}
                                                </div>
                                            {/* } */}
                                            <h5 onClick={() => this.removeFromCart(product_id)}>&#128465;</h5>
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
                <div className="checkout-container">
                    <StripeCheckout 
                        label="Checkout Now" 
                        name="Jaybird Checkout"
                        amount={this.state.total * 100 }
                        token="token"
                    />
                </div>
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