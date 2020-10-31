import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
import { productSlice } from './slices/productSlice';

const reducer = {
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
};

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
