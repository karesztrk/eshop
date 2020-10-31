import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { cartSlice } from './slices/cartSlice';
import { productSlice } from './slices/productSlice';
import { orderSlice } from './slices/orderSlice';

const reducer = {
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
};

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
