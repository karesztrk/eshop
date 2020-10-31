import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orderCreate: {},
  orderDetails: { loading: true, orderItems: [], shippingAddress: {} },
  orderPay: {},
  orderListMy: { orders: [] },
  orderList: { orders: [] },
  orderDeliver: {},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Create
    orderCreateRequest: (state) => {
      state.orderCreate.loading = true;
    },
    orderCreateSuccess: (state, { payload }) => {
      state.orderCreate.loading = false;
      state.orderCreate.success = true;
      state.orderCreate.order = payload;
    },
    orderCreateFail: (state, { payload }) => {
      state.orderCreate.loading = false;
      state.orderCreate.error = payload;
    },
    // Details
    orderDetailsRequest: (state) => {
      state.orderDetails.loading = true;
    },
    orderDetailsSuccess: (state, { payload }) => {
      state.orderDetails.loading = false;
      state.orderDetails.order = payload;
    },
    orderDetailsFail: (state, { payload }) => {
      state.orderDetails.loading = false;
      state.orderDetails.error = payload;
    },
    // Pay
    orderPayRequest: (state) => {
      state.orderPay.loading = true;
    },
    orderPaySuccess: (state, payload) => {
      state.orderPay.loading = false;
      state.orderPay.success = true;
      state.orderPay.order = payload;
    },
    orderPayFail: (state, { payload }) => {
      state.orderPay.loading = false;
      state.orderPay.error = payload;
    },
    orderPayReset: (state) => {
      state.orderPay = {};
    },
    // List my
    orderListMyRequest: (state) => {
      state.orderListMy.loading = true;
    },
    orderListMySuccess: (state, { payload }) => {
      state.orderListMy.loading = false;
      state.orderListMy.orders = payload;
    },
    orderListMyFail: (state, { payload }) => {
      state.orderListMy.loading = false;
      state.orderListMy.error = payload;
    },
    orderListMyReset: (state) => {
      state.orderListMy = {
        orders: [],
      };
    },
    // List
    orderListRequest: (state) => {
      state.orderList.loading = true;
    },
    orderListSuccess: (state, { payload }) => {
      state.orderList.loading = false;
      state.orderList.orders = payload;
    },
    orderListFail: (state, { payload }) => {
      state.orderList.loading = false;
      state.orderList.error = payload;
    },
    // Deliver
    orderDeliverRequest: (state) => {
      state.orderDeliver.loading = true;
    },
    orderDeliverSuccess: (state, { payload }) => {
      state.orderDeliver.loading = false;
      state.orderDeliver.success = true;
      state.orderDeliver.order = true;
    },
    orderDeliverFail: (state, { payload }) => {
      state.orderDeliver.loading = false;
      state.orderDeliver.error = payload;
    },
    orderDeliverReset: (state) => {
      state.orderDeliver = {};
    },
  },
});

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderPayReset,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  orderListMyReset,
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset,
} = orderSlice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest());
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
    const { data } = await axios.post('/api/orders', order, config);

    dispatch(orderCreateSuccess(data));
  } catch (error) {
    dispatch(
      orderCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());
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
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    dispatch(
      orderDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(orderPayRequest());
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
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch(orderPaySuccess(data));
  } catch (error) {
    dispatch(
      orderPayFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest());
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
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      config,
    );

    dispatch(orderDeliverSuccess(data));
  } catch (error) {
    dispatch(
      orderDeliverFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyRequest());
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
    const { data } = await axios.get('/api/orders/myorders', config);

    dispatch(orderListMySuccess(data));
  } catch (error) {
    dispatch(
      orderListMyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest());
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
    const { data } = await axios.get('/api/orders', config);

    dispatch(orderListSuccess(data));
  } catch (error) {
    dispatch(
      orderListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};
