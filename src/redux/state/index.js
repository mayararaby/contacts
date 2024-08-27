import { configureStore } from '@reduxjs/toolkit'
import {contactsReducer} from '../reducer/index'

export default configureStore({
  reducer: contactsReducer,
})