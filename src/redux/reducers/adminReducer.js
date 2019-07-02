import axios from 'axios'

const initialState = {
    users: [],
    orders: []
}

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_FULFILLED = 'GET_ORDERS_FULFILLED'

const GET_USERS = 'GET_USERS'
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED'

const CHANGE_ADMIN = 'CHANGE_ADMIN'
const CHANGE_ADMIN_FULFILLED = 'CHANGE_ADMIN_FULFILLED'

const DELETE_USER = 'DELETE_USER'
const DELETE_USER_FULFILLED = 'DELETE_USER_FULFILLED'

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


