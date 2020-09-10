import { combineReducers } from 'redux'
import autReducer from './authReducer'

export default combineReducers({
  auth: autReducer,
})
