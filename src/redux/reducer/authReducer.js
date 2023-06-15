import {
  REMOVE_USER_DATA,
  USER_DATA,
  USER_DATA_ERR,
} from "../types";
import { createSlice } from '@reduxjs/toolkit'
import { ApiGet } from "../../utils/ApiData";
import STORAGEKEY from "../../config/storageKey";
import AuthStorage from "../../utils/AuthStorage";

const initialState = {
  userData: {

  },
  userDataErr: null,
  isLogged: false
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginAction: (state, data) => {
      data.payload && AuthStorage.setStorageJsonData(STORAGEKEY.token, data.payload, true);
      state.isLogged = true
    },
    logoutAction: (state) => {
      state.isLogged = false
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    addToCart: (state, action) => {
      let reduxItem = [{
          item: action.payload.item,
          quantity: action.payload.itemCount
      }]
      state.userData = {
        ...state.userData,
        cart: [
          ...(state.userData?.cart?.map(cartItem => {
              if(cartItem?.item?._id == reduxItem[0]?.item?._id) {
                  reduxItem = [];
                  console.log("payload", action.payload.itemCount)
                  return {
                      item: cartItem.item,
                      quantity: cartItem.quantity + action.payload.itemCount
                  }
              }
              return cartItem
          })),
          ...reduxItem
        ]
      }
    },
    clearCart: (state) => {
      state.userData = {
        ...state.userData,
        cart: []
      }
    },
    decreaseFromCart: (state, action) => {
      const itemId = action.payload
      state.userData = {
        ...state.userData,
        cart: state.userData.cart.map(cartItem => {
          if(cartItem.item._id == itemId && cartItem.quantity > 1) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1
            }
          }
          return cartItem
        })
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.userData = {
        ...state.userData,
        cart: state.userData.cart.filter(cartItem => cartItem.item._id != itemId)
      }
    },
    removeUserData: (state) => {
      state.userData = {}
      state.isLogged = false
    }
  },
})

export const { loginAction, logoutAction, setUserData, removeUserData, addToCart, decreaseFromCart, removeFromCart, clearCart } = userDataSlice.actions;

export default userDataSlice.reducer