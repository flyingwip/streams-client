import { combineReducers } from 'redux'
// form reducer is already made. Only need to assing to the combineReducers
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import streamReducer from './streamReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
})
