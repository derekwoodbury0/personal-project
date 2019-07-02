import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'

class User extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                    <div style={{height: '75px'}}></div>
                    <h1>Account Settings</h1>
                </div>
                {this.props.user ?
                <div>
                    <h1>Name: {this.props.user.name}</h1>
                    <h1>email: {this.props.user.email}</h1>
                </div>
                :
                null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.data
    }
}

export default connect(mapStateToProps, { getUser })(User)