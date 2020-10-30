import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './slices/productReducers';
import { cartReducer } from './slices/cartReducers';
import { userSlice } from './slices/userSlice';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './slices/orderReducers';

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userSlice.reducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
};

const cartItemsFromStroage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStroage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const shippingAddressFromStroage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initalState = {
  cart: {
    cartItems: cartItemsFromStroage,
    shippingAddress: shippingAddressFromStroage,
  },
  userLogin: {
    userInfo: userInfoFromStroage,
  },
};

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
