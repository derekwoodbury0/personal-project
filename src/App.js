import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import { connect } from 'react-redux'
import { getUser } from './redux/reducers/userReducer'
import { getCart } from './redux/reducers/cartReducer'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import axios from 'axios'

import openSocket from 'socket.io-client'
const socket = openSocket('http://10.0.0.164:4001')

class App extends Component {
  constructor() {
    super()

    this.state = {
      chat: false,
      message: '',
      messages: []
    }
  }

  async componentDidMount() {
    await this.props.getUser()
    this.subscribeToTimer()
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
        let { message } = this.state
        axios.post('/api/chattext', {message})
        this.sendMessage(message)
        // this.receiveMessage()
    }
  }

  subscribeToTimer(cb){
    socket.emit('subscribeToTimer', 1000)
    socket.on('messages', cb = (messages) => {
        this.setState ({ messages })
        console.log(messages)
    })
  }

  receiveMessage(){
      console.log('receiveMessage')
      socket.on('emittedMessage', receivedMessages => {
          console.log('emittedMessage handler invoked', receivedMessages)
          this.setState ({ messages: receivedMessages})
      })    
    }

  sendMessage(message){
      socket.emit('sendMessage', message)
  }


  render() {
    console.log(this.state.message)
    return (
      <div className="App">
          <Header />
          {routes}
          <Footer />
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
                            <h1 key ={index} style={{color: 'black'}}>{message}</h1>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.data,
    // cart: state.cartReducer.data
  }
}

export default connect(mapStateToProps, { getUser, getCart })(App);
