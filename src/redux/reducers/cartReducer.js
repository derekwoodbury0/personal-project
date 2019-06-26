import axios from "axios";

const initialState = {
    data: []
}

const ADD_TO_CART = 'ADD_TO_CART'
const ADD_TO_CART_FULFILLED = 'ADD_TO_CART_FULFILLED'

const GET_CART = 'GET_CART'
const GET_CART_FULFILLED = 'GET_CART_FULFILLED'

const CLEAR_CART = 'CLEAR_CART'

const UPDATE_CART = 'UPDATE_CART'
const UPDATE_CART_FULFILLED = 'UPDATE_CART_FULFILLED'

const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_FROM_CART_FULFILLED = 'REMOVE_FROM_CART'

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_FULFILLED:
            return {...state, data: action.payload.data }
        case GET_CART_FULFILLED:
            return {...state, data: action.payload.data}
        case CLEAR_CART:
            return {...state, data: []}
        case UPDATE_CART_FULFILLED:
            return {...state, data: action.payload.data}
        case REMOVE_FROM_CART_FULFILLED:
            return {...state, data: action.payload.data}
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