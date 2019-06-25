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
                <h1>Your Shopping Cart</h1>
                <div>
                    {this.props.cart.map(product => {
                        let {product_name, image_url, price} = product
                        return (
                            <div>
                                <h1>{product_name}</h1>
                            </div>
                        )
                    })}
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