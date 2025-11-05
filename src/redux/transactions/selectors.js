import { createSelector } from '@reduxjs/toolkit'

const selectAllTransactions = (state) => state.transactions.items

const selectTransactionsSummary = (state) => state.transactions.summary

const selectCategoriesSummary = (state) =>
  state.transactions.summary?.categoriesSummary

const selectFilteredCategories = createSelector(
  [selectCategoriesSummary],
  (categoriesSummary) => {
    return categoriesSummary?.filter((item) => item.name !== 'Income')
  }
)

const selectTransactionIdForDelete = (state) =>
  state.transactions.transactionIdForDelete

const selectTransactionForUpdate = (state) =>
  state.transactions.transactionForUpdate

const selectIsLoading = (state) => state.transactions.isLoading

export {
  selectAllTransactions,
  selectTransactionsSummary,
  selectTransactionIdForDelete,
  selectTransactionForUpdate,
  selectFilteredCategories,
  selectIsLoading,
}
