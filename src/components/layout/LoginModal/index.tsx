'use client'
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {

  const router = useRouter()

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

          <Typography variant="h6" fontWeight={700} textAlign="center" marginBottom='40px'>
            Login
          </Typography>

          <TextField
            label="Email"
            placeholder="Digite seu email"
            fullWidth
            variant="outlined"
            size="small"
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            fullWidth
            type="password"
            variant="outlined"
            size="small"
          />

          <Box width="100%" textAlign="left" marginTop='-20px'>
            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--may-green)', textDecoration: 'underline' }}>
              Esqueci a senha!
            </a>
          </Box>

          <Button
            variant="contained"
            style={{
              backgroundColor: 'var(--may-green)',
              textTransform: 'none',
              borderRadius: 8,
              width: '144px'
            }}
            onClick={() => {
              router.push('/home') 
            }}
          >
            Acessar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
