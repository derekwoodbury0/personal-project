import axios from "axios";

const initialState = {
    data: []
}

const ADD_TO_CART = 'ADD_TO_CART'
const ADD_TO_CART_FULFILLED = 'ADD_TO_CART_FULFILLED'

const GET_CART = 'GET_CART'
const GET_CART_FULFILLED = 'GET_CART_FULFILLED'

const CLEAR_CART = 'CLEAR_CART'
const CLEAR_CART_FULFILLED = 'CLEAR_CART_FULFILLED'

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_FULFILLED:
            return {...state, data: action.payload.data }
        case GET_CART_FULFILLED:
            return {state}
        case CLEAR_CART_FULFILLED:
            return {...state, data: []}
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
        type: GET_CART
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}