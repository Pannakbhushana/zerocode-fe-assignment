import { Dispatch } from "@reduxjs/toolkit";
import { resetAuthState } from "../redux/authSlice";
import { path } from "../components/constant";
import { removeToken, removeUserInfo } from "../components/user/user-auth";
import { NavigateFunction } from "react-router-dom";

const logoutUser = (dispatch: Dispatch, navigate?: NavigateFunction) => {

  dispatch(resetAuthState()); // Reset authentication state
  removeToken(); // Remove token from storage
  removeUserInfo(); // Remove username from storage

  if (navigate) {
    navigate(path.LOGIN_PAGE); // Redirect to login page
  }
};

export const isTokenExpired = (endDate: number | null) => {
  return endDate ? Date.now() >= endDate * 1000 : true;
};

export default logoutUser;
