import React, { Component } from 'react'
import './Admin.css'
import { getUser } from '../../redux/reducers/userReducer'
import { getOrders, getUsers, changeAdmin, deleteUser } from '../../redux/reducers/adminReducer'
import { connect } from 'react-redux'

class Admin extends Component {
    constructor() {
        super()

        this.state = {
            showUsers: false,
            showOrders: false
        }
    }

    componentDidMount() {
        this.props.getOrders()
        this.props.getUsers()
    }

    toggleShowUsers = () => {
        this.setState({ showUsers: !this.state.showUsers })
    }

    toggleShowOrders = () => {
        this.setState ({ showOrders: !this.state.showOrders })
    }

    changeAdmin = userInfo => {
        this.props.changeAdmin(userInfo)
    }

    deleteUser = user_id => {
        this.props.deleteUser(user_id)
    }

    render() {
        return (
            <div className="admin-page">
                <div>
                    <div style={{height: '75px'}}></div>
                    <h1 className="main-header">Admin Page</h1>
                </div>
                {this.props.isAdmin && this.props.user ?
                    <div>
                        <h1 onClick={() => this.toggleShowUsers()} className="headers">All Users &nbsp;
                            {this.state.showUsers ?
                                <span style={{fontSize: '20px'}}>&#9660;</span>
                                :
                                <span style={{fontSize: '20px'}}>&#9658;</span>
                            }
                        </h1>
                        {this.state.showUsers ?
                            <div className="admin-users-container">
                                {this.props.users.map(user => {
                                    return (
                                        <div className="admin-user-container" key={user.user_id}>
                                            <h3><span style={{textDecoration: 'underline'}}>Name</span>: {user.name}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Email</span>: {user.email}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Admin Access</span>: {user.is_admin ? 'Yes' : 'No'}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>User ID</span>: {user.user_id}</h3>
                                            <div>
                                                <button onClick={() => this.changeAdmin(user)} style={{marginRight: '15px'}}>Change Admin Access</button>
                                                <button onClick={() => this.deleteUser(user.user_id)}>Delete User</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            null
                        }
                        <h1 onClick={() => this.toggleShowOrders()} className="headers">All Orders &nbsp;
                            {this.state.showOrders ?
                                <span style={{fontSize: '20px'}}>&#9660;</span>
                                :
                                <span style={{fontSize: '20px'}}>&#9658;</span>
                            }
                        </h1>
                        {this.state.showOrders ?
                            <div className="admin-users-container">
                                {this.props.orders.map(order => {
                                    return (
                                        <div className="admin-order-container" key={order.order_id}>
                                            <h3><span style={{textDecoration: 'underline'}}>Order Number</span>: {order.order_id}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Name</span>: {order.name}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Email</span>: {order.email}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Product Ordered</span>: {order.product_name}</h3>
                                            <h3><span style={{textDecoration: 'underline'}}>Quantity</span>: {order.quantity}</h3>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            null
                        }
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

export default connect( mapStateToProps, { getUser, getOrders, getUsers, changeAdmin, deleteUser })(Admin)