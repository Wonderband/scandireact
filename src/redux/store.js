import { configureStore } from '@reduxjs/toolkit';
// import { sessionSlicePersistedReducer } from './session/sessionSlice';
// import { financeSliceReducer } from './finance/financeSlice';
// import { globalSliceReducer } from './global/globalSlice';
// import { transactionsSummaryReducer } from './finance/transactionsSummary/transactionsSummarySlice';
import { changeProductsReducer } from './changeProductsSlice';

export const store = configureStore({
  reducer: {
    changeProducts: changeProductsReducer,   
  },
  
});

