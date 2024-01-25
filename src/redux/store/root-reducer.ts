import { combineReducers } from '@reduxjs/toolkit'
import { reducer as systemSettings } from '../slices/systemSettings/index'

export const rootReducer = combineReducers({
  systemSettings,
})
