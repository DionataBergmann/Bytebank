import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export type Transaction = {
  id: number
  type: 'Entrada' | 'Saída'
  value: number
  date: string
  category: string
  file?: File | null
  isEditing?: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/transactions'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data as Transaction[]
  }
)

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: Transaction) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    })
    const data = await response.json()
    return data as Transaction
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return id
  }
)

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, updated }: { id: number; updated: Partial<Transaction> }) => {
    const response = await fetch(`${API_URL}/${id}`)
    const existing = await response.json()

    const updatedData = {
      ...existing,
      ...updated,
      id: Number(id), 
      file:
        updated.file instanceof File
          ? updated.file.name
          : updated.file ?? null,
      isEditing: false
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    const data = await res.json()

    return {
      ...data,
      id: Number(data.id)
    } as Transaction
  }
)


type TransactionState = {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setEditingState(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.map(tx =>
        tx.id === action.payload ? { ...tx, isEditing: true } : tx
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to load transactions'
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload)
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(tx => tx.id !== action.payload)
      })

      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.map(tx =>
          tx.id === action.payload.id ? action.payload : tx
        )
      })
  }
})

export const { setEditingState } = transactionSlice.actions
export default transactionSlice.reducer
