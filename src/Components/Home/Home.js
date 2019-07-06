import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EmailSignup from '../EmailSignup/EmailSignup'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import { getCart } from '../../redux/reducers/cartReducer'
import Carousel from '../Carousel/Carousel'


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            chat: false,
            message: '',
            messages: []
        }
    }

    componentDidMount() {
        axios.get('/api/products').then( response => {
            this.setState ({ products: response.data })
        }).catch(error => console.log(error))
    }

    toggleChat = () => {
        this.setState ({ chat: !this.state.chat})
    }

    handleChange = (e) => {
        let { name, value } = e.target

        this.setState ({ [name]: value })
    }

    handleClick = () => {
        if (this.state.message) {
            let { message, messages } = this.state
            let response = 'Thanks. A representative will be with you shortly.'
            let newMessages = [...messages, message, response]
            this.setState({ messages: newMessages })
        }
    }

    render() {
        return (
            <div className="homepage">
                {/* <div style={{height: '75px'}}></div> */}
                <Carousel />
                <div className="homepage-masthead">
                    <div className="welcome-message">
                    {this.props.user ? 
                        <h4>Welcome Back, {this.props.user.name}!</h4>
                        :
                        null
                    }
                    </div>
                    <div className="homepage-masthead-text-container">
                        <h1 className="homepage-masthead-text">Audio For <br/>Everywhere</h1>
                    </div>
                        <div className="homepage-masthead-link">
                    <Link to="/products">
                            <p className="homepage-masthead-link-text">See More &rarr;</p>
                    </Link>
                        </div>
                </div>

                <div className="power-your-passion-container">
                    <div className="power-your-passion-text">
                        <h1>Power Your<br /> Passion.</h1>
                        <h6>High-Performance Wireless Audio For Athletes.</h6>
                    </div>
                </div>

                <div className="home-products">
                <div className="home-products-tarah" style={{borderTop: '1px gray solid'}}>
                        <img src="https://3v718laqyo244ii5v20dg6ff-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/5-Runners-Share-Their-Morning-Routines-Rachel.jpg" alt="" className="home-products-tarah-image" />
                        <div className="home-products-tarah-text">
                            <h1>Tarah Pro</h1>
                            <h2 style={{marginBottom: '40px'}}>Epic Endurance &emsp;</h2>
                            <Link to="/products/2" >
                                <h2 style={{color: 'white'}}>Shop Now &rarr;</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="home-products-tarah">
                        <img src="https://wmimg.azureedge.net/public/img/articles/why-are-east-african-runners-so-dominant-/why-are-east-african-runners-so-dominant-.jpg" alt="" className="home-products-tarah-image"  />
                        <div className="home-products-tarah-text">
                            <h1>Run XT</h1>
                            <h2 style={{marginBottom: '40px'}}>Run Redefined &emsp;&nbsp;&nbsp;</h2>
                            <Link to="/products/3" >
                                <h2 style={{color: 'white'}}>Shop Now &rarr;</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="home-products-tarah">
                        <img src="http://www.runnersblueprint.com/wp-content/uploads/2014/07/Strength-Training-For-Runners.jpg" alt="" className="home-products-tarah-image"  />
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
                <div>
                    <div onClick={this.toggleChat} className="live-chat-link">
                        <i className="far fa-comment-alt" ></i>
                    </div>
                    {this.state.chat &&
                    <div className="live-chat">
                        <div className="live-chat-conversation-box">
                            { this.state.messages === [] ?
                            null
                            :
                            this.state.messages.map((message, index) => {
                                return (
                                    <h1 key={message} style={{color: 'black'}}>{message}</h1>
                                )
                            })
                            }
                        </div>
                        <div className="live-chat-input-box">
                            <input 
                                placeholder="type question" 
                                name="message"
                                onChange={this.handleChange}    
                            />
                            <button onClick={this.handleClick}>Send</button>
                        </div>
                    </div>
                    }
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

export default connect(mapStateToProps, { getUser, getCart })(Home)