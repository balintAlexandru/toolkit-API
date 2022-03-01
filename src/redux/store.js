import { configureStore } from '@reduxjs/toolkit'
import personRedux from '../features/apiSlice'
import axios from "axios";

export const store = configureStore({
  reducer: {
    person:personRedux,
  },
})
