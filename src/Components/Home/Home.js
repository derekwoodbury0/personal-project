import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EmailSignup from '../EmailSignup/EmailSignup'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import { getCart } from '../../redux/reducers/cartReducer'


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
                        <h4>Welcome Back, {this.props.user.name}!</h4>
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

                <div className="home-products">
                <div className="home-products-tarah">
                        <img src="https://3v718laqyo244ii5v20dg6ff-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/5-Runners-Share-Their-Morning-Routines-Rachel.jpg" alt="" height="200" width="300" />
                        <div className="home-products-tarah-text">
                            <h1>Tarah Pro</h1>
                            <h2 style={{marginBottom: '40px'}}>Epic Endurance</h2>
                            <Link to="/products/2" >
                                <h2 style={{color: 'white'}}>Shop Now &rarr;</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="home-products-tarah">
                        <img src="https://wmimg.azureedge.net/public/img/articles/why-are-east-african-runners-so-dominant-/why-are-east-african-runners-so-dominant-.jpg" alt="" height="200" width="300" />
                        <div className="home-products-tarah-text">
                            <h1>Run XT</h1>
                            <h2 style={{marginBottom: '40px'}}>Run Redefined</h2>
                            <Link to="/products/3" >
                                <h2 style={{color: 'white'}}>Shop Now &rarr;</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="home-products-tarah">
                        <img src="http://www.runnersblueprint.com/wp-content/uploads/2014/07/Strength-Training-For-Runners.jpg" alt="" height="200" width="300" />
                        <div className="home-products-tarah-text">
                            <h1>X4</h1>
                            <h2 style={{marginBottom: '40px'}}>Rugged Versatility</h2>
                            <Link to="/products/4" >
                                <h2 style={{color: 'white'}}>Shop Now &rarr;</h2>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <EmailSignup />
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

export default connect(mapStateToProps, { getUser, getCart })(Home)