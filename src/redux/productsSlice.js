import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addNewProduct, deleteSelected, getAllProducts } from "./operations";

const initialState = {
  products: [],
  pending: false,
};

const options = [getAllProducts, deleteSelected, addNewProduct];
const getOption = (status) => options.map((option) => option[status]);

const handlePending = (state) => {
  state.pending = true;
};

const handleRejected = (state, { payload }) => {
  state.pending = false;
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.pending = false;
      })
      .addCase(deleteSelected.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(
          (product) => !payload.includes(product.sku)
        );
        state.pending = false;
      })
      .addCase(addNewProduct.fulfilled, (state, { payload }) => {
        state.products = [...state.products, payload];
        state.pending = false;
      })
      .addMatcher(isAnyOf(...getOption("pending")), handlePending)
      .addMatcher(isAnyOf(...getOption("rejected")), handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
