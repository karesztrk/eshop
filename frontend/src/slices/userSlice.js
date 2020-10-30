import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

const initialState = {
  userLogin: {},
  userRegister: {},
  userDetails: { user: {} },
  userUpdateProfile: {},
  userList: {},
  userDelete: {},
  userUpdate: { user: {} },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login
    userLoginRequest: (state) => {
      state.userLogin.loading = true;
    },
    userLoginFail: (state, { payload }) => {
      state.userLogin.loading = false;
      state.userLogin.error = payload;
    },
    userLoginSuccess: (state, { payload }) => {
      state.userLogin.loading = false;
      state.userLogin.userInfo = payload;
    },
    userLogout: (state) => {},
    // Register
    userRegisterRequest: (state) => {
      state.userRegister.loading = true;
    },
    userRegisterFail: (state, { payload }) => {
      state.userRegister.loading = false;
      state.userRegister.error = payload;
    },
    userRegisterSuccess: (state, { payload }) => {
      state.userRegister.loading = false;
      state.userRegister.userInfo = payload;
    },
    // Details
    userDetailsRequest: (state) => {
      state.userDetails.loading = true;
    },
    userDetailsFail: (state, { payload }) => {
      state.userDetails.loading = false;
      state.userDetails.error = payload;
    },
    userDetailsSuccess: (state, { payload }) => {
      state.userDetails.loading = false;
      state.userDetails.user = payload;
    },
    userDetailsReset: (state) => {
      state.userDetails.user = {};
    },
    // Update profile
    userUpdateProfileRequest: (state) => {
      state.userUpdateProfile.loading = true;
    },
    userUpdateProfileFail: (state, { payload }) => {
      state.userUpdateProfile.loading = false;
      state.userUpdateProfile.error = payload;
    },
    userUpdateProfileSuccess: (state, { payload }) => {
      state.userUpdateProfile.loading = false;
      state.userUpdateProfile.success = true;
      state.userUpdateProfile.userInfo = payload;
    },
    userUpdateProfileReset: (state) => {
      state.userUpdateProfile = {};
    },
    // User list
    userListRequest: (state) => {
      state.userList.loading = true;
    },
    userListFail: (state, { payload }) => {
      state.userList.loading = false;
      state.userList.error = payload;
    },
    userListSuccess: (state, { payload }) => {
      state.userList.loading = false;
      state.userList.users = payload;
    },
    userListReset: (state) => {
      state.userList.users = [];
    },
    // User delete
    userDeleteRequest: (state) => {
      state.userDelete.loading = true;
    },
    userDeleteFail: (state, { payload }) => {
      state.userDelete.loading = false;
      state.userDelete.error = payload;
    },
    userDeleteSuccess: (state) => {
      state.userDelete.loading = false;
      state.userDelete.success = true;
    },
    // User update
    userUpdateRequest: (state) => {
      state.userUpdate.loading = true;
    },
    userUpdateFail: (state, { payload }) => {
      state.userUpdate.loading = false;
      state.userUpdate.error = payload;
    },
    userUpdateSuccess: (state, { payload }) => {
      state.userUpdate.loading = false;
      state.userUpdate.success = true;
    },
    userUpdateReset: (state) => {
      state.userUpdate.user = {};
    },
  },
});

export const {
  userLoginRequest,
  userLoginFail,
  userLoginSuccess,
  userLogout,
  userRegisterRequest,
  userRegisterFail,
  userRegisterSuccess,
  userDetailsRequest,
  userDetailsFail,
  userDetailsSuccess,
  userDetailsReset,
  userUpdateProfileRequest,
  userUpdateProfileFail,
  userUpdateProfileSuccess,
  userUpdateProfileReset,
  userListRequest,
  userListFail,
  userListSuccess,
  userListReset,
  userDeleteRequest,
  userDeleteFail,
  userDeleteSuccess,
  userUpdateRequest,
  userUpdateFail,
  userUpdateSuccess,
  userUpdateReset,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config,
    );

    dispatch(userLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
  dispatch(userDetailsReset());
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch(userListReset());
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config,
    );

    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch(userDetailsSuccess(data));
  } catch (error) {
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest());
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put('/api/users/profile', user, config);

    dispatch(userUpdateProfileSuccess(data));
    dispatch(userLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userUpdateProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListRequest());
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/users', config);

    dispatch(userListSuccess(data));
  } catch (error) {
    dispatch(
      userListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteRequest());
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);

    dispatch(userDeleteSuccess());
  } catch (error) {
    dispatch(
      userDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest());
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch(userUpdateSuccess(data));
  } catch (error) {
    dispatch(
      userUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};
