import {combineReducers} from 'redux'
import authReducer from './authSlice'
import variableReducer from './variableSlice'
const rootReducer = combineReducers({
  auths:authReducer,
  variables:variableReducer,
})

export default rootReducer