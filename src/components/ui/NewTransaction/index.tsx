import { useState } from 'react'
import { Transaction } from '@/components/pages/HomePage'
import { Button, MenuItem, Select, TextField, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'

type Props = {
  addTransaction: (transaction: Transaction) => void
}

export default function NewTransaction({ addTransaction }: Props) {
  const [type, setType] = useState<string>('Selecione o tipo de transação')
  const [value, setValue] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!value || !type) return

    const signedValue = type === 'Transferência' ? -Math.abs(value) : Math.abs(value)
    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR')

    addTransaction({
      id: Date.now(),
      type: type as 'Depósito' | 'Transferência',
      value: signedValue,
      date: formattedDate
    })

    setValue(0)
    setType('')
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value)
  }

  return (
    <div style={{ backgroundColor: 'var(--background-gray)' }} className="shadow rounded p-4 mt-4 w-full lg:min-w-[690px]">
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--azureish-White)' }}>Nova transação</h3>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <FormControl sx={{ width: '300px' }}>
          <Select
            labelId="transaction-type-label"
            value={type}
            onChange={handleTypeChange}
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
            <MenuItem value="Selecione o tipo de transação">
              <em>Selecione o tipo de transação</em>
            </MenuItem>
            <MenuItem value="Depósito">Depósito</MenuItem>
            <MenuItem value="Transferência">Transferência</MenuItem>
          </Select>
        </FormControl>

        <text style={{ color: 'var(--azureish-White)', fontWeight: 'bold', fontSize: '18px' }}>Valor</text>

        <TextField
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Valor"
          sx={{
            width: '150px',
            '& input': {
              padding: '10px 14px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--primary-blue)',
              },
              borderRadius: '8px'
            },
          }}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 600,
            '&:hover': { backgroundColor: 'var(--primary-blue)' },
            textTransform: 'none',
            width: '180px',
            mt: 2,
            ml: 'auto'
          }}
        >
          Concluir transação
        </Button>
      </form>
    </div>
  )
}
