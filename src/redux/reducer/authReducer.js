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
    loginAction: (state) => {
      state.isLogged = true
    },
    logoutAction: (state) => {
      AuthStorage.deauthenticateUser()
      state.isLogged = false
    },
    setUserData: (state, action) => {
      state.userData = action.payload
      state.isLogged = true
    },
    addToCart: (state, action) => {
      let reduxItem = [{
          item: action.payload.item,
          size: action.payload.size,
          quantity: action.payload.itemCount
      }]
      state.userData = {
        ...state.userData,
        cart: [
          ...(state.userData?.cart?.map(cartItem => {
              if(cartItem?.item?._id == reduxItem[0]?.item?._id && cartItem?.size == reduxItem[0].size) {
                  reduxItem = [];
                  return {
                      item: cartItem.item,
                      size: cartItem.size,
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
      const cartItem = action.payload
      state.userData = {
        ...state.userData,
        cart: state.userData.cart.map(_cartItem => {
          if(_cartItem.item._id == cartItem.item._id && _cartItem.size == cartItem.size && _cartItem.quantity > 1) {
            return {
              ..._cartItem,
              quantity: _cartItem.quantity - 1
            }
          }
          return _cartItem
        })
      }
    },
    removeFromCart: (state, action) => {
      const cartItem = action.payload
      state.userData = {
        ...state.userData,
        cart: state.userData.cart.filter(_cartItem => {
          return (_cartItem?.item?._id != cartItem?.item?._id || _cartItem?.size != cartItem?.size)
        })
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