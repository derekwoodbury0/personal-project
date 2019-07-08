import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Products.css'
import EmailSignup from '../EmailSignup/EmailSignup'
import Loader from '../Loader/Loader'

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/api/products').then( response => {
            this.setState ({ products: response.data, loading: false })
        }).catch(error => console.log(error))
        window.scrollBy(0,-10000000)
    }

    render() {
        return (
            <div className="products-page">
                <div style={{height: '75px'}}></div>
                {this.state.loading ?
                    <Loader />
                    :
                <div>
                    {this.state.products.map(product => {
                        let { product_id, product_name, price, image_url, battery_life, waterproof_rating, header_text } = product
                        return (
                            <div className="products-page-container" key={product_id}>
                                <Link to={`/products/${product_id}`} key={product_id}>
                                    <div className="products" style={{backgroundImage: `url(${image_url})`}}>
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
                            <div className="product-info-desktop-view">
                                <h1>{header_text}</h1>
                                <h1>{battery_life}</h1>
                                <h1>{waterproof_rating}</h1>
                            </div>
                        </div>
                        )
                    })}
                </div>
                }
                <EmailSignup />
            </div>
            )
        }
    }

export default Products