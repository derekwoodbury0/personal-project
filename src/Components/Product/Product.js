import React, { Component } from 'react'
import './Product.css'
import axios from 'axios';
import { addToCart } from '../../redux/reducers/cartReducer'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [],
            addedToCart: false,
            loading: true
        }
    }

    componentDidMount() {
        axios.get(`/api/products/${this.props.match.params.id}`).then(response => {
            this.setState ({ product: response.data, loading: false })
        })
        window.scrollBy(0,-10000000)
    }

    addToCart = (id) => {
        if (this.props.user) {
        this.props.addToCart(id)
        this.setState ({ addedToCart: true})
        } else {
            alert('please log in to add items to cart')
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '75px'}}></div>
                    {this.state.loading ?
                        <Loader />
                        :
                        <div>
                        {this.state.product.map(product => {
                            let { product_name, image_url, product_id, price, header_text, description, battery_life, waterproof_rating,
                                fit, sound_quality, type, noise_isolation, impedence, speaker_sensitivity, output_max, audio_format,
                                driver_size, video_url, play_time, charging_time, quick_charge, charging, input_power, battery_type,
                                battery_voltage, energy_voltage, quote, quote_author } = product
                            return (
                                <div key={product_id}>
                                    <div className="product">
                                        <div className="product-masthead">
                                            <img className="product-image" src={image_url} alt="" />
                                            <div className="product-masthead-right-side-desktop">
                                                <div className="product-name-container">
                                                    <h1>{product_name}</h1>
                                                    <div>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                                                    <h3>${price}</h3>
                                                    <h6>Wireless Sport Headphones</h6>
                                                    {this.state.addedToCart ? 
                                                        <button style={{color: 'limegreen'}}>&#10003; Added To Cart</button>
                                                    :
                                                        <button onClick={() => this.addToCart(product_id)}>Add To Cart</button>
                                                    }
                                                </div>
                                                <div style={{ width: '90%', height: '1px', border: '1px gray solid'}}></div>
                                                <div className="guarantees-container">
                                                    <h5>&#10003; Free Shipping On All Headphones</h5>
                                                    <h5>&#10003; Free 30-Day Money Back Guarantee</h5>
                                                </div>
                                            </div>
                                        </div>
                                            <iframe
                                                title={product_name}
                                                width="729" 
                                                height="410" 
                                                src={video_url} 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen>
                                            </iframe>
                                        <div style={{ width: '95%', height: '1px', border: '1px gray solid'}}></div>
                                        <h1 style={{width: '300px', textAlign: 'left', margin: '50px 0', fontSize: '35px'}}>{header_text}</h1>
                                        <div className="image-features-desktop">
                                            <div className="runner-image" >
                                                <img src="https://kid101.com/wp-content/uploads/2017/03/Outdoor-Adventure-Fest.jpg" alt=''/>
                                                <h6 className="headphone-description">{description}</h6>
                                            </div>
                                            <div className="features-container">
                                                <div className="features-columns">
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
                                                {this.state.product[0].quote === null ?
                                                    null :
                                                <div className="quote-container">
                                                    <div style={{textAlign: 'left'}}>"{quote}"</div>
                                                    <div style={{textAlign: 'left', width: '100%'}}>-{quote_author}</div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        <h1 style={{width: '95%', textAlign: 'left', margin: '55px 0', fontSize: '35px'}}>Tech Specs</h1>
                                        <div className="specs-container-full">
                                            <div className="specs-container">
                                                <h2>-Audio-</h2>
                                                <h6>Type: {type}</h6>
                                                <h6>Noise-Isolation: {noise_isolation}</h6>
                                                <h6>Impedence: {impedence}</h6>
                                                <h6>Speaker Sensitivity: {speaker_sensitivity}</h6>
                                                <h6>Output Max: {output_max}</h6>
                                                <h6>Audio Format: {audio_format}</h6>
                                                <h6>Driver Size: {driver_size}</h6>
                                            </div>
                                            <div className="specs-container">
                                                <h2>-Battery-</h2>
                                                <h6>Play Time: {play_time}</h6>
                                                <h6>Charging Time: {charging_time}</h6>
                                                <h6>Quick Charge: {quick_charge}</h6>
                                                <h6>Charging: {charging}</h6>
                                                <h6>Input Power: {input_power}</h6>
                                                <h6>Type: {battery_type}</h6>
                                                <h6>Battery Voltage: {battery_voltage}</h6>
                                                <h6>Energy Voltage Per Battery: {energy_voltage}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.data,
        user: state.userReducer.data
    }
}

export default connect(mapStateToProps, {addToCart, getUser})(Product)