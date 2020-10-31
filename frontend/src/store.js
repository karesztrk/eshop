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
import { userSlice } from './slices/userSlice';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './slices/orderReducers';
import { cartSlice } from './slices/cartSlice';

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartSlice.reducer,
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

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
