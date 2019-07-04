import axios from 'axios'

const initialState = {
    users: [],
    orders: []
}

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_FULFILLED = 'GET_ORDERS_FULFILLED'
const GET_ORDERS_REJECTED = 'GET_ORDERS_REJECTED'

const GET_USERS = 'GET_USERS'
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED'
const GET_USERS_REJECTED = 'GET_USERS_REJECTED'

const CHANGE_ADMIN = 'CHANGE_ADMIN'
const CHANGE_ADMIN_FULFILLED = 'CHANGE_ADMIN_FULFILLED'
const CHANGE_ADMIN_REJECTED = 'CHANGE_ADMIN_REJECTED'

const DELETE_USER = 'DELETE_USER'
const DELETE_USER_FULFILLED = 'DELETE_USER_FULFILLED'
const DELETE_USER_REJECTED = 'DELETE_USER_REJECTED'

const REFUND_ORDER = 'REFUND_ORDER'
const REFUND_ORDER_FULFILLED = 'REFUND_ORDER_FULFILLED'

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ORDERS_FULFILLED:
            return {...state, orders: action.payload.data}
        case GET_USERS_FULFILLED:
            return {...state, users: action.payload.data}
        case CHANGE_ADMIN_FULFILLED:
            return {...state, users: action.payload.data}
        case DELETE_USER_FULFILLED:
            return {...state, users: action.payload.data}
        case REFUND_ORDER_FULFILLED:
            return {...state, orders: action.payload.data}
        default:
            return state
    }
}

export function getUsers() {
    return {
        type: GET_USERS,
        payload: axios.get('/api/admin/users')
    }
}

export function changeAdmin(userInfo) {
    return {
        type: CHANGE_ADMIN,
        payload: axios.put('/api/admin/changeadmin', userInfo)
    }
}

export function deleteUser(user_id) {
    return {
        type: DELETE_USER,
        payload: axios.delete(`/api/admin/deleteuser/${user_id}`)
    }
}

export function getOrders() {
    return {
        type: GET_ORDERS,
        payload: axios.get('/api/admin/orders')
    }
}

export function refundOrder(order_id) {
    return {
        type: REFUND_ORDER,
        payload: axios.put(`/api/refund/${order_id}`)
    }
}

