import React, { Component } from 'react'
import './Chat.css'
import axios from 'axios'
import openSocket from 'socket.io-client'
import { connect } from 'react-redux'

const socket = openSocket()

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chat: false,
      message: '',
      messages: []
    }
  }

  componentDidMount() {
    this.subscribeToTimer()
    socket.on('emittedMessage', receivedMessages => {
      this.setState({ messages: receivedMessages })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.length) {
      this.pageScroll()
    }
  }
  
  toggleChat = async() => {
    await this.setState({ chat: !this.state.chat })
    this.pageScroll()
  }

  pageScroll() {
    if (this.state.chat) {
    document.getElementById('chat-box-id').scrollBy(0,10000000000000000)
    }
  }

  handleChange = (e) => {
    let { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleClick = () => {
    if (this.state.message) {
      let { message } = this.state
      axios.post('/api/chattext', { message })
      this.sendMessage(message)
      this.setState({ message: '' })
    }
  }

  keyPressed = e => {
    if (e.key === 'Enter') {
      this.handleClick()
    }
  }

  subscribeToTimer(cb) {
    socket.emit('subscribeToTimer', 1000)
    socket.on('messages', cb = (messages) => {
      this.setState({ messages })
    })
  }

  sendMessage(message) {
    socket.emit('sendMessage', message)
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleChat} className="live-chat-link">
          <i className="far fa-comment-alt" ></i>
        </div>
        {this.state.chat &&
          <div className="live-chat">
            <div className="live-chat-conversation-box">
              <div className="live-chat-conversation-box-inner" id='chat-box-id'>
                {this.state.messages !== [] && this.props.user ?
                  this.state.messages.map((message, index) => {
                    return (
                      <h2 key={index} style={{ color: 'black' }}>{message}</h2>
                    )
                  })
                  :
                  <h2 style={{ color: 'black' }}>Please Log In To Chat</h2>
                }
              </div>
            </div>
            <div className="live-chat-input-box">
              {this.props.user ?
              <input
                placeholder="type question"
                name="message"
                onChange={this.handleChange}
                value={this.state.message}
                onKeyPress={this.keyPressed}
                autoComplete="off"
              />
              :
              <input
                placeholder="Please Log In To Chat"
                style={{background: 'lightgray', color: 'black'}}
                disabled
              />
              }
              <button onClick={this.handleClick}>Send</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.data,
  }
}

export default connect(mapStateToProps)(Chat)