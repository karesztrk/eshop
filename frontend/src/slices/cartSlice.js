import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartItemsFromStroage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStroage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cartItems: cartItemsFromStroage,
  shippingAddress: shippingAddressFromStroage,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const item = payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      let cartItems;
      if (existItem) {
        cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x,
        );
      } else {
        cartItems = [...state.cartItems, item];
      }

      state.cartItems = cartItems;
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== payload);
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

const {
  addItem,
  removeItem,
  savePaymentMethod: savePaymentMethodAction,
  saveShippingAddress: saveShippingAddressAction,
} = cartSlice.actions;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch(
    addItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    }),
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(removeItem(id));

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(saveShippingAddressAction(data));

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(savePaymentMethodAction(data));

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
