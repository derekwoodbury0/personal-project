import axios from "axios";

const initialState = {
    data: [],
    loading: false
}

const ADD_TO_CART = 'ADD_TO_CART'
const ADD_TO_CART_FULFILLED = 'ADD_TO_CART_FULFILLED'
const ADD_TO_CART_PENDING = 'ADD_TO_CART_PENDING'
// const ADD_TO_CART_REJECTED = 'ADD_TO_CART_REJECTED'

const GET_CART = 'GET_CART'
const GET_CART_FULFILLED = 'GET_CART_FULFILLED'
const GET_CART_PENDING = 'GET_CART_PENDING'
const GET_CART_REJECTED = 'GET_CART_REJECTED'

const CLEAR_CART = 'CLEAR_CART'

const UPDATE_CART = 'UPDATE_CART'
const UPDATE_CART_FULFILLED = 'UPDATE_CART_FULFILLED'
const UPDATE_CART_PENDING = 'UPDATE_CART_PENDING'
// const UPDATE_CART_REJECTED = 'UPDATE_CART_REJECTED'

const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_FROM_CART_FULFILLED = 'REMOVE_FROM_CART'
const REMOVE_FROM_CART_PENDING = 'REMOVE_FROM_CART_PENDING'
// const REMOVE_FROM_CART_REJECTED = 'REMOVE_FROM_CART_REJECTED'

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_PENDING:
            return {...state, loading: true}
        case ADD_TO_CART_FULFILLED:
            return {...state, data: action.payload.data, loading: false }
        case GET_CART_PENDING:
            return {...state, loading: true}
        case GET_CART_FULFILLED:
            return { ...state, data: action.payload.data, loading: false }
        case GET_CART_REJECTED:
            return {...state, loading: false}
        case CLEAR_CART:
            return {...state, data: []}
        case UPDATE_CART_PENDING:
            return {...state, loading: true}
        case UPDATE_CART_FULFILLED:
            return {...state, data: action.payload.data, loading: false}
        case REMOVE_FROM_CART_PENDING:
            return {...state, loading: true}
        case REMOVE_FROM_CART_FULFILLED:
            return {...state, data: action.payload.data, loading: false}
        default:
            return state
    }
}

export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        payload: axios.post(`/api/cart/${id}`)
    }
}

export function getCart() {
    return {
        type: GET_CART,
        payload: axios.get('/api/getcart')
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function updateCart(id, updatedQuantity) {
    return {
        type: UPDATE_CART,
        payload: axios.put(`api/cart/update/${id}`, updatedQuantity)
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        payload: axios.delete(`api/cart/remove/${id}`)
    }
}