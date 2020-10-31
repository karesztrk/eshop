import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productList: {
    products: [],
  },
  productDetails: {
    product: { reviews: [] },
  },
  productDelete: {},
  productCreate: {},
  productUpdate: { product: {} },
  productReviewCreate: {},
  productTopRated: { products: [] },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // List
    productListRequest: (state) => {
      state.productList.loading = true;
      state.productList.products = [];
    },
    productListSuccess: (state, { payload }) => {
      state.productList.loading = false;
      state.productList.products = payload.products;
      state.productList.pages = payload.pages;
      state.productList.page = payload.page;
    },
    productListFail: (state, { payload }) => {
      state.productList.loading = false;
      state.productList.error = payload;
    },
    // Details
    productDetailsRequest: (state) => {
      state.productDetails.loading = true;
    },
    productDetailsSuccess: (state, { payload }) => {
      state.productDetails.loading = false;
      state.productDetails.product = payload;
    },
    productDetailsFail: (state, { payload }) => {
      state.productDetails.loading = false;
      state.productDetails.error = payload;
    },
    // Delete
    productDeleteRequest: (state) => {
      state.productDelete.loading = true;
    },
    productDeleteSuccess: (state) => {
      state.productDelete.loading = false;
      state.productDelete.success = true;
    },
    productDeleteFail: (state, { payload }) => {
      state.productDelete.loading = false;
      state.productDelete.error = payload;
    },
    // Create
    productCreateRequest: (state) => {
      state.productCreate.loading = true;
    },
    productCreateSuccess: (state, { payload }) => {
      state.productCreate.loading = false;
      state.productCreate.success = true;
      state.productCreate.product = payload;
    },
    productCreateFail: (state, { payload }) => {
      state.productCreate.loading = false;
      state.productCreate.error = payload;
    },
    productCreateReset: (state) => {
      state.productCreate = {};
    },
    // Update
    productUpdateRequest: (state) => {
      state.productUpdate.loading = true;
    },
    productUpdateSuccess: (state, { payload }) => {
      state.productUpdate.loading = false;
      state.productUpdate.success = true;
      state.productUpdate.product = payload;
    },
    productUpdateFail: (state, { payload }) => {
      state.productUpdate.loading = false;
      state.productUpdate.error = payload;
    },
    productUpdateReset: (state) => {
      state.productUpdate = {
        product: {},
      };
    },
    // Review create
    productReviewCreateRequest: (state) => {
      state.productReviewCreate.loading = true;
    },
    productReviewCreateSuccess: (state) => {
      state.productReviewCreate.loading = false;
      state.productReviewCreate.success = true;
    },
    productReviewCreateFail: (state, { payload }) => {
      state.productReviewCreate.loading = false;
      state.productReviewCreate.error = payload;
    },
    productReviewCreateReset: (state) => {
      state.productReviewCreate = {};
    },
    // Top rated
    productTopRatedRequest: (state) => {
      state.productTopRated.loading = true;
      state.productTopRated.products = [];
    },
    productTopRatedSuccess: (state, { payload }) => {
      state.productTopRated.loading = false;
      state.productTopRated.products = payload;
    },
    productTopRatedFail: (state, { payload }) => {
      state.productTopRated.loading = false;
      state.productTopRated.error = payload;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  productReviewCreateRequest,
  productReviewCreateSuccess,
  productReviewCreateFail,
  productReviewCreateReset,
  productTopRatedRequest,
  productTopRatedSuccess,
  productTopRatedFail,
} = productSlice.actions;

export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch,
) => {
  try {
    dispatch(productListRequest());
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    );
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(
      productListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailsSuccess(data));
  } catch (error) {
    dispatch(
      productDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteRequest());
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
    await axios.delete(`/api/products/${id}`, config);
    dispatch(productDeleteSuccess());
  } catch (error) {
    dispatch(
      productDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest());
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
    const { data } = await axios.post(`/api/products/`, {}, config);
    dispatch(productCreateSuccess(data));
  } catch (error) {
    dispatch(
      productCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productUpdateRequest());
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
      `/api/products/${product._id}`,
      product,
      config,
    );
    dispatch(productUpdateSuccess(data));
  } catch (error) {
    dispatch(
      productUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(productReviewCreateRequest());
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
    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch(productReviewCreateSuccess());
  } catch (error) {
    dispatch(
      productReviewCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRatedRequest());
    const { data } = await axios.get('/api/products/top');
    dispatch(productTopRatedSuccess(data));
  } catch (error) {
    dispatch(
      productTopRatedFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      ),
    );
  }
};
