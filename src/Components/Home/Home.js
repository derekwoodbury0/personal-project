import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EmailSignup from '../EmailSignup/EmailSignup'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'


class Home extends Component {
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
            <div className="homepage">
                <div className="homepage-masthead">
                    <div className="welcome-message">
                    {this.props.user ? 
                        <h4>Welcome back, {this.props.user.name}!</h4>
                        :
                        null
                    }
                    </div>
                    <div className="homepage-masthead-text-container">
                        <h1 className="homepage-masthead-text">Audio For <br/>Athletes</h1>
                    </div>
                        <div className="homepage-masthead-link">
                    <Link to="/products">
                            <p className="homepage-masthead-link-text">See More &rarr;</p>
                    </Link>
                        </div>
                </div>
                <div className="products-page">
                    <div style={{height: '75px'}}></div>
                    {this.state.products.map(product => {
                        let { product_id, product_name, price, image_url } = product
                        return (
                            <Link to={`/products/${product_id}`} key={product_id}>
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
                </div>
                <EmailSignup />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.data
    }
}

export default connect(mapStateToProps, { getUser })(Home)