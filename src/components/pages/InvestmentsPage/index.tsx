import Dashboard from '@/components/layout/Dashboard'
import MainLayout from '@/components/layout/MainLayout'
import BalanceCard from '@/components/ui/BalanceCard'
import TransactionList from '@/components/ui/TransactionList'
import { useTransactions } from '@/hooks/useTransactions'

export default function InvestmentsPage() {
  const {
    transactions,
    handleDeleteTransaction,
    handleEditTransaction,
    handleSaveTransaction,
  } = useTransactions()

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-40 mx-auto max-w-6xl ">
        <div className="md:col-span-2 flex flex-col gap-6">
          <BalanceCard transactions={transactions} />
          <Dashboard transactions={transactions} />
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
