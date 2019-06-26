import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import { connect } from 'react-redux'
import { getUser } from './redux/reducers/userReducer'
import { getCart } from './redux/reducers/cartReducer'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

class App extends Component {
  componentDidMount() {
    this.props.getUser()
    this.props.getCart()
  }

  render() {
    return (
        <div className="App">
          <Header />
          {routes}
          <Footer />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.data,
    cart: state.cartReducer.data
  }
}

export default connect(mapStateToProps, { getUser, getCart })(App);
