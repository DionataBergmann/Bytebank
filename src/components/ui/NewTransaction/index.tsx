'use client'

import { useState } from 'react'
import {
  Button,
  TextField,
  FormControl,
  Autocomplete,
  Typography
} from '@mui/material'
import { Transaction } from '@/hooks/useTransactions'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useSnackbar } from 'notistack'

type Props = {
  addTransaction: (transaction: Transaction) => void
}

const categoryOptions = [
  { label: 'Fundos de investimento', group: 'Investimentos' },
  { label: 'Tesouro Direto', group: 'Investimentos' },
  { label: 'Previdência Privada', group: 'Investimentos' },
  { label: 'Bolsa de Valores', group: 'Investimentos' },
  { label: 'Criptomoedas', group: 'Investimentos' },
  { label: 'CDB / RDB', group: 'Investimentos' },
  { label: 'FII', group: 'Investimentos' },
  { label: 'ETFs', group: 'Investimentos' },
  { label: 'Salário', group: 'Receitas' },
  { label: 'Renda Extra', group: 'Receitas' },
  { label: 'Alimentação', group: 'Despesas' },
  { label: 'Transporte', group: 'Despesas' },
  { label: 'Saúde', group: 'Despesas' },
  { label: 'Educação', group: 'Despesas' },
  { label: 'Lazer', group: 'Despesas' },
  { label: 'Moradia', group: 'Despesas' }
]

export default function NewTransaction({ addTransaction }: Props) {
  const { enqueueSnackbar } = useSnackbar()

  const [type, setType] = useState<'Entrada' | 'Saída'>('Entrada')
  const [category, setCategory] = useState<string | null>(null)
  const [value, setValue] = useState<number>()
  const [file, setFile] = useState<File | null>(null)

  const [errors, setErrors] = useState({
    value: false,
    category: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      value: !value || value <= 0,
      category: !category
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    const signedValue = type === 'Saída' ? -Math.abs(value!) : Math.abs(value!)
    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR')

    addTransaction({
      id: Date.now(),
      type,
      value: signedValue,
      date: formattedDate,
      category,
      file
    })

    enqueueSnackbar('Transação adicionada com sucesso!', { variant: 'success' })

    setValue(0)
    setType('Entrada')
    setCategory(null)
    setFile(null)
  }

  return (
    <div
      style={{ backgroundColor: 'var(--background-gray)' }}
      className="shadow rounded p-4 mt-4 w-full lg:min-w-[690px]"
    >
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--azureish-white)' }}>
        Nova transação
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button
            variant={type === 'Entrada' ? 'contained' : 'outlined'}
            onClick={() => setType('Entrada')}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: type === 'Entrada' ? 'var(--green-entry)' : 'transparent',
              color: type === 'Entrada' ? 'white' : 'var(--green-entry)',
              borderColor: 'var(--green-entry)',
              minWidth: 120,
              '&:hover': {
                backgroundColor:
                  type === 'Entrada'
                    ? 'var(--green-entry-hover)'
                    : 'var(--green-entry-bg-light)'
              }
            }}
          >
            Entrada
          </Button>
          <Button
            variant={type === 'Saída' ? 'contained' : 'outlined'}
            onClick={() => setType('Saída')}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: type === 'Saída' ? 'var(--red-exit)' : 'transparent',
              color: type === 'Saída' ? 'white' : 'var(--red-exit)',
              borderColor: 'var(--red-exit)',
              minWidth: 120,
              '&:hover': {
                backgroundColor:
                  type === 'Saída'
                    ? 'var(--red-exit-hover)'
                    : 'var(--red-exit-bg-light)'
              }
            }}
          >
            Saída
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormControl sx={{ flex: 1 }}>
            <Autocomplete
              options={categoryOptions}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              value={categoryOptions.find((opt) => opt.label === category) || null}
              onChange={(_, newValue) => setCategory(newValue?.label ?? null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categoria"
                  placeholder="Escolha ou digite uma categoria"
                  InputLabelProps={{ shrink: true }}
                  error={errors.category}
                  helperText={errors.category ? 'Selecione uma categoria' : ''}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'var(--primary-blue)' },
                      borderRadius: '8px'
                    }
                  }}
                />
              )}
            />
          </FormControl>

          <TextField
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            label="Valor"
            placeholder="Digite o valor"
            InputLabelProps={{ shrink: true }}
            error={errors.value}
            helperText={errors.value ? 'Informe um valor maior que zero' : ''}
            fullWidth
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--primary-blue)' },
                borderRadius: '8px'
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="contained"
            component="label"
            startIcon={<AttachFileIcon />}
            sx={{
              backgroundColor: 'var(--primary-blue)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontWeight: 600,
              textTransform: 'none',
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'var(--primary-blue)'
              }
            }}
          >
            Anexar comprovante
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Button>

          {file && (
            <Typography sx={{ fontSize: 14, color: 'var(--outer-space-gray)' }}>
              Arquivo selecionado: <strong>{file.name}</strong>
            </Typography>
          )}
        </div>

        <div className="flex justify-end">
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
              width: '180px'
            }}
          >
            Concluir transação
          </Button>
        </div>
      </form>
    </div>
  )
}
