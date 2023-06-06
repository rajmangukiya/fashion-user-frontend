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
      AuthStorage.setStorageJsonData(STORAGEKEY.token, data.payload, true);
      state.isLogged = true
    },
    logoutAction: (state) => {
      state.isLogged = false
    },
    getUserData: (state) => {
      ApiGet("user/GetUser")
        .then((res) => {
          state.userData = res
          state.isLogged = true
        })
        .catch((error) => {
          state.userData = {}
          state.userDataErr = error
          state.isLogged = false
        });
    },
    removeUserData: (state) => {
      state.userData = {}
      state.isLogged = false
    }
  },
})

export const { loginAction, logoutAction, getUserData, removeUserData } = userDataSlice.actions

export default userDataSlice.reducer