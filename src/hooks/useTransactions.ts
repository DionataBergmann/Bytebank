import { useEffect, useState } from 'react'

export type Transaction = {
  id: number
  type: 'Entrada' | 'Saída'
  value: number
  date: string
  category: string | null
  file?: File | string | null
  isEditing?: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error('Erro ao buscar transações:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

 const addTransaction = async (transaction: Transaction) => {
  try {
    const sanitizedTransaction = {
      ...transaction,
      id: Number(transaction.id),
      file: transaction.file instanceof File ? transaction.file.name : transaction.file ?? null
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedTransaction)
    })

    const newTransaction = await response.json()
    setTransactions(prev => [...prev, newTransaction])
  } catch (error) {
    console.error('Erro ao adicionar transação:', error)
  }
}
  const handleDeleteTransaction = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setTransactions(prev => prev.filter(tx => tx.id !== id))
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }

  const handleEditTransaction = (id: number) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === id ? { ...tx, isEditing: true } : tx))
    )
  }

const handleSaveTransaction = async (id: number, updated: Partial<Transaction>) => {
  try {
    const checkRes = await fetch(`${API_URL}/${id}`)
    if (!checkRes.ok) {
      console.error(`Transação com ID ${id} não encontrada no servidor.`)
      return
    }

    const existing = await checkRes.json()

    const updatedData = {
      ...existing,
      ...updated,
      file:
        updated.file instanceof File
          ? updated.file.name
          : updated.file ?? null,
      isEditing: false
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Erro na atualização (${response.status}): ${errorText}`)
      return
    }

    const saved = await response.json()

    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? saved : tx))
    )
  } catch (error) {
    console.error('Erro ao salvar transação:', error)
  }
}


  return {
    transactions,
    loading,
    addTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleSaveTransaction
  }
}
