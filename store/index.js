import { configureStore } from '@reduxjs/toolkit'
import loginSlice  from '../feature/loginSlice'
import leadSlice from '../feature/leadSlice'
import citySlice from '../feature/citySlice'

export const store = configureStore({
  reducer: {
    login : loginSlice,
    lead : leadSlice,
    city : citySlice
  },
})