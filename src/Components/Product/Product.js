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
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '75px'}}></div>
                    {this.state.product.map(product => {
                        let { product_name, image_url, product_id, price, header_text, description, battery_life, waterproof_rating,
                            fit, sound_quality, type, noise_isolation, impedence, speaker_sensitivity, output_max, audio_format, driver_size } = product
                        return (
                            <div key={product_id}>
                                <div className="product">
                                    <img className="product-image" src={image_url} alt="" />
                                    <div className="product-name-container">
                                        <h1>{product_name}</h1>
                                        <div>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                                        <h3>${price}</h3>
                                        <h6>Wireless Sport Headphones</h6>
                                        <button onClick={() => this.addToCart(product_id)}>Add To Cart</button>
                                    </div>
                                    <div style={{ width: '90%', height: '1px', border: '1px gray solid'}}></div>
                                    <div className="guarantees-container">
                                        <h5>&#10003; Free Shipping On All Headphones</h5>
                                        <h5>&#10003; Free 30-Day Money Back Guarantee</h5>
                                    </div>
                                    <div style={{ width: '95%', height: '1px', border: '1px gray solid'}}></div>
                                    <h1 style={{width: '95%', textAlign: 'left', margin: '50px 0', fontSize: '35px'}}>{header_text}</h1>
                                    <div style={{width: '100vw', textAlign: 'right', marginBottom: '20px'}}>
                                        <img src="https://kid101.com/wp-content/uploads/2017/03/Outdoor-Adventure-Fest.jpg" alt='' height="200" width="275"/>
                                    </div>
                                    <h6 style={{textAlign: 'left', lineHeight: '20px', paddingLeft: '5px', marginBottom: '50px'}}>{description}</h6>
                                    <div className="features-container">
                                        <div className="features-column">
                                            <h5>{battery_life}</h5>
                                            <h5>{waterproof_rating}</h5>
                                            <h5>{fit}</h5>
                                            <h5>{sound_quality}</h5>
                                        </div>
                                        <div className="features-column">
                                            <h5>Music And Calls</h5>
                                            <h5>iF Design Award 2019</h5>
                                            <h5>reddot Design Award 2019</h5>
                                        </div>
                                    </div>
                                    <h1 style={{width: '95%', textAlign: 'left', margin: '55px 0', fontSize: '35px'}}>Tech Specs</h1>
                                    <div className="specs-container">
                                        <h6>Type: {type}</h6>
                                        <h6>Noise-Isolation: {noise_isolation}</h6>
                                        <h6>Impedence: {impedence}</h6>
                                        <h6>Speaker Sensitivity: {speaker_sensitivity}</h6>
                                        <h6>Output Max: {output_max}</h6>
                                        <h6>Audio Format: {audio_format}</h6>
                                        <h6>Driver Size: {driver_size}</h6>
                                    </div>
                                </div>
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