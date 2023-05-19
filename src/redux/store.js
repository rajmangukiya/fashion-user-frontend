import { configureStore } from "@reduxjs/toolkit";
import {cartSlice, userDataSlice} from './reducer/index';

const store = configureStore({
     reducer: {
         cart: cartSlice,
         authInfo: userDataSlice
     }
})

export default store;