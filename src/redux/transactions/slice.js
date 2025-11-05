import { createSlice } from '@reduxjs/toolkit';

import {
  addTransaction,
  deleteTransaction,
  fetchAllTransactions,
  fetchTransactionsSummary,
  modifyTransaction,
} from './operations';

const initialState = {
  categories: [],
  items: [],

  isLoading: false,
  error: null,

  summary: [],

  transactionIdForDelete: '',
  transactionForUpdate: '',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionIdForDelete: (state, action) => {
      state.transactionIdForDelete = action.payload;
    },
    setTransactionForUpdate: (state, action) => {
      state.transactionForUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // * Add transaction
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })

      // * Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex((el) => el.id === action.payload);
        if (index !== -1) state.items.splice(index, 1);
      })

      // * Modify transaction
      .addCase(modifyTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(modifyTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(modifyTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex((el) => el.id === action.payload.id);
        if (index !== -1) state.items.splice(index, 1, action.payload);
      })

      // * Get all transactions
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      // * Get transactions summary
      .addCase(fetchTransactionsSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.summary = action.payload;
      });
  },
});

export const { setTransactionIdForDelete, setTransactionForUpdate } =
  transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;
