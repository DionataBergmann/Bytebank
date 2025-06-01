'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LoginModal from '@/components/layout/LoginModal'

interface HeaderProps {
  isOpenLoginModal: boolean
  setIsOpenLoginModal: (value: boolean) => void
}

export default function Header({ isOpenLoginModal, setIsOpenLoginModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between  md:justify-around relative z-50">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <CloseIcon className="text-[var(--may-green)]" />
            ) : (
              <MenuIcon className="text-[var(--may-green)]" />
            )}
          </button>
        </div>
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Bytebank logo"
            className="block md:hidden lg:block w-auto h-6" />
          <img
            src="/logo-small.svg"
            alt="Bytebank small logo"
            className="hidden md:block lg:hidden w-auto h-6" />
        </div>

        <nav className="hidden md:flex space-x-6">
          <a
            href="#sobre"
            className="text-[var(--may-green)] text-[18px] font-medium hover:underline"
          >
            Sobre
          </a>
          <a
            href="#servicos"
            className="text-[var(--may-green)] text-[18px] font-medium hover:underline"
          >
            Serviços
          </a>
        </nav>

        <div className="hidden md:flex space-x-3">
          <Button
            variant="contained"
            size="medium"
            style={{
              width: '180px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: 'var(--may-green)',
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Abrir minha conta
          </Button>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => setIsOpenLoginModal(true)}
            style={{
              width: '180px',
              height: '48px',
              borderRadius: '8px',
              border: '2px solid var(--may-green)',
              color: 'var(--may-green)',
              fontWeight: 500,
              textTransform: 'none',
              marginLeft: '20px'
            }}
          >
            Já tenho conta
          </Button>
        </div>



        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black px-6 py-6 flex flex-col items-center space-y-5 md:hidden">
            <a
              href="#sobre"
              className="text-[var(--may-green)] text-[18px] font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#servicos"
              className="text-[var(--may-green)] text-[18px] font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Serviços
            </a>
          </div>
        )}
      </header>
      <LoginModal open={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
    </>
  )
}
