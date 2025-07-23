'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useRouter } from 'next/router'

import MainLayout from '@/components/layout/MainLayout'
import BalanceCard from '@/components/ui/BalanceCard'
import NewTransaction from '@/components/ui/NewTransaction'
import TransactionList from '@/components/ui/TransactionList'
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  setEditingState,
  updateTransaction
} from '@/store/transactionSlice'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

   const { transactions, loading } = useSelector((state: RootState) => state.transactions)
  const token = useSelector((state: RootState) => state.auth.token)
  const initialized = useSelector((state: RootState) => state.auth.initialized)

  useEffect(() => {
    if (!initialized) return

    if (!token) {
      router.push('/')
      return
    }

    dispatch(fetchTransactions())
  }, [dispatch, token, router, initialized])

  if (!initialized) return null 
  if (!token) return null

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-40 mx-auto max-w-6xl">
        <div className="md:col-span-2 flex flex-col gap-6">
          <BalanceCard transactions={transactions} />
          <NewTransaction addTransaction={(tx) => dispatch(addTransaction(tx))} />
        </div>

        <div>
          <TransactionList
            transactions={transactions}
            onDelete={(id) => dispatch(deleteTransaction(id))}
            onEdit={(id) => dispatch(setEditingState(id))}
            onSave={(id, updated) => dispatch(updateTransaction({ id, updated }))}
          />
        </div>
      </div>
    </MainLayout>
  )
}
