import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import { connect } from 'react-redux'
import { getUser } from './redux/reducers/userReducer'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

class App extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    console.log(this.props)
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

export default connect(mapStateToProps, { getUser })(App);
