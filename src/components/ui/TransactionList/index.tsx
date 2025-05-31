import { Transaction } from '@/components/pages/HomePage'
import { useState } from 'react'
import EditTransactionModal from '../EditTransactionModal'

type Props = {
  transactions: Transaction[]
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onSave: (id: number, updated: Partial<Transaction>) => void
}

function groupByMonth(transactions: Transaction[]) {
  return transactions.reduce((groups, tx) => {
    const [day, month] = tx.date.split('/')
    const key = Number(month)
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(tx)
    return groups
  }, {} as { [key: number]: Transaction[] })
}

function getMonthName(month: number) {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  return meses[month - 1]
}

export default function TransactionList({ transactions, onDelete, onSave }: Props) {
  const grouped = groupByMonth(transactions)

  const [open, setOpen] = useState(false)
  const [currentTx, setCurrentTx] = useState<Transaction | null>(null)

  const handleEditClick = (tx: Transaction) => {
    setCurrentTx(tx)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentTx(null)
  }

  return (
    <div className="bg-white shadow rounded p-4 w-full lg:min-w-[270px]">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Extrato</h3>

      {transactions.length === 0 ? (
        <p className="text-gray-400 text-sm italic text-center">Nenhuma transação encontrada.</p>
      ) : (
        Object.keys(grouped).sort((a, b) => Number(b) - Number(a)).map((month) => (
          <div key={month} className="mb-4">
            <h4 className="text-[var(--primary-blue)] text-[13px]">{getMonthName(Number(month))}</h4>
            <ul className="divide-y divide-gray-200 text-[var(--background-gray)]">
              {grouped[Number(month)].map((tx) => (
                <li key={tx.id} className="py-2 text-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{tx.type} - {tx.date.split('/').slice(0, 2).join('/')}</p>
                      <p className={tx.value >= 0 ? 'text-green-600' : 'text-red-600'}>
                        R$ {tx.value.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditClick(tx)}>
                        <img src="/pincel.svg" alt="Editar" className="w-5 h-5 cursor-pointer" />
                      </button>
                      <button onClick={() => onDelete(tx.id)}>
                        <img src="/trash.svg" alt="Excluir" className="w-5 h-5 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <EditTransactionModal
        open={open}
        onClose={handleClose}
        onSave={onSave}
        transaction={currentTx}
      />
    </div>
  )
}