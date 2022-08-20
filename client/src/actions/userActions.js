import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (first_name, last_name, email, phoneNumber, password, pic) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/register",
        {
          first_name,
          last_name,
          email,
          phoneNumber,
          password,
          pic,
        },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/user/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/user/admin`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};
