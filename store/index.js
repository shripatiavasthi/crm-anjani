import { configureStore } from '@reduxjs/toolkit'
import loginSlice  from '../feature/loginSlice'
import leadSlice from '../feature/leadSlice'
import citySlice from '../feature/citySlice'
import testSlice from '../feature/testParaSlice'
import test from '../feature/testSlice'

export const store = configureStore({
  reducer: {
    login : loginSlice,
    lead : leadSlice,
    city : citySlice,
    testpara : testSlice,
    test : test

  },
})