import axios from 'axios'

const initialState = {
    users: [],
    orders: []
}

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_FULFILLED = 'GET_ORDERS_FULFILLED'

const GET_USERS = 'GET_USERS'
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED'

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ORDERS_FULFILLED:
            return {...state, orders: action.payload.data}
        case GET_USERS_FULFILLED:
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

export function getOrders() {
    return {
        type: GET_ORDERS,
        payload: axios.get('/api/admin/orders')
    }
}


