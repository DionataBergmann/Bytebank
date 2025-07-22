import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'

import MainLayout from '@/components/layout/MainLayout'
import BalanceCard from '@/components/ui/BalanceCard'
import NewTransaction from '@/components/ui/NewTransaction'
import TransactionList from '@/components/ui/TransactionList'
import { addTransaction, deleteTransaction, fetchTransactions, setEditingState, updateTransaction } from '@/store/transactionSlice'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions, loading } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

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
