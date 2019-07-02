import React, { Component } from 'react'
import './Admin.css'
import { getUser } from '../../redux/reducers/userReducer'
import { getOrders, getUsers} from '../../redux/reducers/adminReducer'
import { connect } from 'react-redux'

class Admin extends Component {
    componentDidMount() {
        this.props.getOrders()
        this.props.getUsers()
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                    <div style={{height: '75px'}}></div>
                    <h1>Admin Page</h1>
                </div>
                {this.props.isAdmin && this.props.user ?
                    <div>
                        <h1>All Users &#9658;</h1>
                        <div className="admin-users-container">
                            {this.props.users.map(user => {
                                return (
                                    <div className="admin-user-container">
                                        <h3>Name: {user.name}</h3>
                                        <h3>Email: {user.email}</h3>
                                        <h3>Admin Permissions: {user.is_admin ? 'Yes' : 'No'}</h3>
                                        <div>
                                            <button>Change Admin Status</button>
                                            <button>Delete User</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <h1>All Orders</h1>
                        <div>
                            {this.props.orders.map(order => {
                                return (
                                    <div>
                                        <h3>{order.order_id}</h3>
                                        <h3>{order.name}</h3>
                                        <h3>{order.email}</h3>
                                        <h3>{order.product_name}</h3>
                                        <h3>{order.quantity}</h3>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <h1 className="no-admin-access">Please Log In As Admin To Access This Page</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.data,
        isAdmin: state.userReducer.isAdmin,
        orders: state.adminReducer.orders,
        users: state.adminReducer.users
    }
}

export default connect( mapStateToProps, { getUser, getOrders, getUsers })(Admin)