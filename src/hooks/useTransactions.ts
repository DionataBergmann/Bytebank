// src/hooks/useTransactions.ts
import { useEffect, useState } from 'react'

export type Transaction = {
  id: number
  type: 'Entrada' | 'Saída'
  value: number
  date: string
  category: string
  file?: File
  isEditing?: boolean
}

export function useTransactions() {
 const [transactions, setTransactions] = useState<Transaction[]>(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('transactions')
    return stored ? JSON.parse(stored) : []
  }
  return []
})

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction])
  }

  const handleDeleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  const handleEditTransaction = (id: number) => {
    setTransactions(prev =>
      prev.map(tx => tx.id === id ? { ...tx, isEditing: true } : tx)
    )
  }

  const handleSaveTransaction = (id: number, updated: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, ...updated, isEditing: false } : tx
      )
    )
  }

  return {
    transactions,
    addTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleSaveTransaction,
  }
}
