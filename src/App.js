import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import { connect } from 'react-redux'
import { getUser } from './redux/reducers/userReducer'
import { getCart } from './redux/reducers/cartReducer'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Chat from './Components/Chat/Chat'

class App extends Component {

  async componentDidMount() {
    await this.props.getUser()
  }

  render() {
    return (
      <div className="App">
          <Header />
          {routes}
          <Footer />
          <Chat />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.data,
  }
}

export default connect(mapStateToProps, { getUser, getCart })(App);
