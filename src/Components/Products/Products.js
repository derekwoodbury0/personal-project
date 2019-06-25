import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Products.css'
import EmailSignup from '../EmailSignup/EmailSignup'

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/products').then( response => {
            this.setState ({ products: response.data })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="products-page">
                <div style={{height: '75px'}}></div>
                {this.state.products.map(product => {
                    let { product_id, product_name, price, image_url } = product
                    return (
                        <Link to={`/products/${product_id}`}>
                            <div className="product" key={product_id} style={{backgroundImage: `url(${image_url})`}}>
                                <div className="product-info-container">
                                    <div className="product-info-text">
                                        <h4 style={{width: '22px'}}>${price}</h4>
                                        <h1>{product_name}</h1>
                                        <div className="shop-now-container">
                                            <p>Shop Now &rarr;</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
                <EmailSignup />
            </div>
        )
    }
}

export default Products