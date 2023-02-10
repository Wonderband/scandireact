import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteSelected, getAllProducts } from "./operations";
// import {
//   toastAddTransactionError,
//   toastAddTransactionSuccess,
// } from 'components/Toast/Toast';
// import {
//   createTransaction,
//   deleteTransaction,
//   editTransaction,
//   getCategories,
//   getTransactions,
// } from './financeOperations';

///////////////// Slice data ///////////////

const initialState = {
  products: [],
  selected: [],
};

// const options = [getCategories, createTransaction, getTransactions];
// const getOption = status => options.map(option => option[status]);

// const handlePending = state => {
//   state.isError = false;
// };

// const handleRejected = (state, { payload }) => {
//   state.isError = true;
//   toastAddTransactionError('Error adding transaction!');
// };

const changeProductsSlice = createSlice({
  name: "changeProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.products = payload;
      })
      .addCase(deleteSelected.fulfilled, (state, { payload }) => {
        if (!payload.length) return;
        state.products = state.products.filter(product => ! payload.includes(product.sku))

        // console.log(payload);
        
      });
    //   .addCase(createTransaction.fulfilled, (state, { payload }) => {
    //     toastAddTransactionSuccess('Success adding transaction!');
    //     state.totalBalance = payload.balanceAfter;
    //     state.transactions = [payload, ...state.transactions];
    //   })
    //   .addCase(getTransactions.fulfilled, (state, { payload }) => {
    //     state.transactions = payload;
    //   })
    //   .addCase(createTransaction.rejected, (_, { payload }) => {
    //     console.log('reject!');
    //   })
    //   .addCase(editTransaction.fulfilled, () => {
    //     toastAddTransactionSuccess('Success editing transaction!');
    //   })
    //   .addCase(deleteTransaction.fulfilled, () => {
    //     toastAddTransactionSuccess('Success deleting transaction!');
    //   })
    //   .addMatcher(isAnyOf(...getOption('pending')), handlePending)
    //   .addMatcher(isAnyOf(...getOption('rejected')), handleRejected);
  },
  //   reducers: {
  //     setBalance: (state, { payload }) => {
  //       state.totalBalance = payload;
  //     },
  //   },
});

export const changeProductsReducer = changeProductsSlice.reducer;
// export const { setBalance } = financeSlice.actions;
