import React, { Component } from 'react'
import './Product.css'
import axios from 'axios';
import { addToCart } from '../../redux/reducers/cartReducer'
import { connect } from 'react-redux'

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: []
        }
    }

    componentDidMount() {
        axios.get(`/api/products/${this.props.match.params.id}`).then(response => {
            this.setState ({ product: response.data })
        })
    }

    addToCart = (id) => {
        this.props.addToCart(id)
    }

    render() {
        return (
            <div>
                <div style={{height: '75px'}}></div>
                    {this.state.product.map(product => {
                        let { product_name, image_url, product_id } = product
                        return (
                            <div key={product_id}>
                                <img className="product-image" src={image_url} alt="" />
                                <h1>{product_name}</h1>
                                <button onClick={() => this.addToCart(product_id)}>Add To Cart</button>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.data
    }
}

export default connect(mapStateToProps, {addToCart})(Product)