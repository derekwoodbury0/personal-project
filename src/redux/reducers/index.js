import { combineReducers } from 'redux'

import userReducer from './userReducer'
import cartReducer from './cartReducer'
import adminReducer from './adminReducer'

export default combineReducers({ userReducer, cartReducer, adminReducer })