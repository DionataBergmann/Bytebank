import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, TextField, FormControl } from '@mui/material'
import { Transaction } from '@/components/pages/HomePage'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (id: number, updated: Partial<Transaction>) => void
  transaction: Transaction | null
}

export default function EditTransactionModal({ open, onClose, onSave, transaction }: Props) {
  const [type, setType] = useState<'Depósito' | 'Transferência'>('Depósito')
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setValue(Math.abs(transaction.value))
    }
  }, [transaction])

  const handleClose = () => {
    setType('Depósito')
    setValue(0)
    onClose()
  }

  const handleSave = () => {
    if (transaction) {
      const signedValue = type === 'Transferência' ? -Math.abs(value) : Math.abs(value)
      onSave(transaction.id, { type, value: signedValue })
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ backgroundColor: 'var(--background-gray)', color: 'var(--azureish-White)' }}>
        Editar Transação
      </DialogTitle>

      <DialogContent
        sx={{ backgroundColor: 'var(--background-gray)', display: 'flex', flexDirection: 'column', gap: 2, pt: 3 }}
      >
        <FormControl sx={{ width: '100%' }}>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as 'Depósito' | 'Transferência')}
            variant="outlined"
            sx={{
              height: '40px',
              '& .MuiSelect-select': {
                color: 'var(--outer-space-gray)',
              },
              '& .MuiSelect-icon': {
                color: 'var(--primary-blue)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-blue)',
                borderRadius: '8px',
              },
            }}
          >
            <MenuItem value="Depósito">Depósito</MenuItem>
            <MenuItem value="Transferência">Transferência</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Valor"
          sx={{
            '& input': {
              padding: '10px 14px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--primary-blue)',
              },
              borderRadius: '8px',
            },
          }}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ backgroundColor: 'var(--background-gray)', p: 2 }}>
        <Button onClick={onClose} variant="text" sx={{ color: 'var(--primary-blue)', fontWeight: 600 }}>
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 600,
            '&:hover': { backgroundColor: 'var(--primary-blue)' },
            textTransform: 'none'
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
