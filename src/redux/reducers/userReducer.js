import axios from 'axios'

const GET_USER = 'GET_USER'
const GET_USER_FULFILLED = 'GET_USER_FULFILLED'

const LOGIN_USER = 'LOGIN_USER'
const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED'

const LOGOUT_USER = 'LOGOUT_USER'
const LOGOUT_USER_FULFILLED = 'LOGOUT_USER_FULFILLED'

const REGISTER_USER = 'REGISTER_USER'
const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED'

const initialState = {
    data: null,
    isAdmin: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_FULFILLED:
           return { ...state, data: action.payload.data, isAdmin: action.payload.data.is_admin } 

        case LOGIN_USER_FULFILLED:
            return { ...state, data: action.payload.data, isAdmin: action.payload.data.is_admin }

        case LOGOUT_USER_FULFILLED:
                return { ...state, data: null, isAdmin: '' }

        case REGISTER_USER_FULFILLED:
            return { ...state, data: action.payload.data, isAdmin: action.payload.data.is_admin }

        case UPDATE_USER_FULFILLED:
            return { ...state, data: action.payload.data, isAdmin: action.payload.data.is_admin }
        
            default:
            return state
    }
}

export function register(registerInfo) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', registerInfo)
    }
}

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/currentUser')
    }
}

export function login(loginInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}

export function updateUser(updateInfo) {
    return {
        type: UPDATE_USER,
        payload: axios.put('/api/updateuser', updateInfo)
    }
}