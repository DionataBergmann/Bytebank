import { useEffect, useState } from 'react'
import BalanceCard from '@/components/ui/BalanceCard'
import NewTransaction from '@/components/ui/NewTransaction'
import TransactionList from '@/components/ui/TransactionList'
import MainLayout from '@/components/layout/MainLayout'

export type Transaction = {
  id: number
  type: 'Depósito' | 'Transferência'
  value: number
  date: string
  isEditing?: boolean
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('transactions')
    if (stored) setTransactions(JSON.parse(stored))
  }, [])

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
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, isEditing: true } : tx))
  }

  const handleSaveTransaction = (id: number, updated: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(tx => tx.id === id ? { ...tx, ...updated, isEditing: false } : tx)
    )
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-40 mx-auto max-w-6xl">
        <div className="md:col-span-2 flex flex-col gap-6">
          <BalanceCard transactions={transactions} />
          <NewTransaction addTransaction={addTransaction} />
        </div>

        <div>
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
            onSave={handleSaveTransaction}
          />
        </div>
      </div>
    </MainLayout>
  )
}
