import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from '../axiosConfig'
import { toast } from 'react-toastify'

// Axios temel ayarlarını uygula
axiosConfig.setAxiosBaseURL()
axiosConfig.setAxiosHeader()

// *Add transaction //
export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const response = await axios.post('/api/transactions', transactionData)
      toast.success('Transaction added successfully!')
      return response.data
    } catch (error) {
      if (error.response) {
        const status = error.response.status

        if (status === 409) {
          toast.error('A transaction with these details already exists!')
        } else if (status === 400) {
          toast.error('Invalid data. Please check all fields and try again.')
        } else if (status === 401) {
          toast.error('Authorization error. Please log in again.')
        } else {
          const message =
            error.response.data.message ??
            'Operation failed and transaction not saved. We are facing some technical problems with our servers!'
          toast.error(message)
        }
      } else {
        toast.error('Network error. Please check your internet connection.')
      }

      return thunkAPI.rejectWithValue(error)
    }
  }
)

// *Get all transactions //
export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAllTransaction',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transactions')
      return response.data
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Conflict while fetching transactions.')
      } else {
        const message =
          error.response?.data?.message ??
          'Operation failed while fetching transactions. Please try again later.'
        toast.error(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// *Delete transaction //
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`)
      toast.success('Transaction deleted successfully!')
      return transactionId
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Conflict error: this transaction could not be deleted.')
      } else if (error.response?.status === 404) {
        toast.error('Transaction not found or already deleted.')
      } else {
        const message =
          error.response?.data?.message ??
          'Operation failed and transaction not deleted. Please try again later.'
        toast.error(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// *Modify transaction //
export const modifyTransaction = createAsyncThunk(
  'transactions/modifyTransaction',
  async ({ transactionId, transactionData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/transactions/${transactionId}`,
        transactionData
      )
      toast.success('Transaction modified successfully!')
      return response.data
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Conflict: Another transaction with similar data exists.')
      } else if (error.response?.status === 404) {
        toast.error('Transaction not found.')
      } else {
        const message =
          error.response?.data?.message ??
          'Operation failed and transaction not modified. Please try again later.'
        toast.error(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// *Get transactions summary //
export const fetchTransactionsSummary = createAsyncThunk(
  'transactions/fetchTransactionsSummary',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?month=${month}&year=${year}`
      )
      return response.data
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Conflict while fetching summary data.')
      } else {
        const message =
          error.response?.data?.message ??
          'Operation failed while fetching summary. Please try again later.'
        toast.error(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)
