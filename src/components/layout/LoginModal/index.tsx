'use client'

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/authSlice'
import { AppDispatch } from '@/store'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

const dispatch = useDispatch<AppDispatch>()

const handleLogin = async () => {
  setLoading(true)
  setError('')

  try {
    const resultAction = await dispatch(loginUser({ email, password }))

    if (loginUser.rejected.match(resultAction)) {
      throw new Error(resultAction.payload as string)
    }

    router.push('/home')
  } catch (err: any) {
    setError(err.message || 'Erro ao fazer login')
  } finally {
    setLoading(false)
  }
}

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={4} pb={6}>
          <img src="/login.svg" alt="Login" />

          <Typography variant="h6" fontWeight={700} textAlign="center" marginBottom="40px">
            Login
          </Typography>

          <TextField
            label="Email"
            placeholder="Digite seu email"
            fullWidth
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            fullWidth
            type="password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Box width="100%" textAlign="left" marginTop="-20px">
            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--may-green)', textDecoration: 'underline' }}>
              Esqueci a senha!
            </a>
          </Box>

          {error && (
            <Typography color="error" fontSize="0.875rem">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            style={{
              backgroundColor: 'var(--may-green)',
              textTransform: 'none',
              borderRadius: 8,
              width: '144px',
              height: '40px',
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              'Acessar'
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
