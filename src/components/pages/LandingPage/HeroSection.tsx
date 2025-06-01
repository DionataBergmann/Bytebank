import LoginModal from '@/components/layout/LoginModal'
import { Button } from '@mui/material'

interface HeroSectionProps {
  isOpenLoginModal: boolean
  setIsOpenLoginModal: (value: boolean) => void
}

export default function HeroSection({ isOpenLoginModal, setIsOpenLoginModal }: HeroSectionProps) {
  return (
    <><section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-10 max-w-6xl mx-auto text-black">

      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">
          Experimente mais liberdade no controle da sua vida financeira. <br />
          Crie sua conta com a gente!
        </h1>
      </div>

      <div className="w-full md:w-1/2 mb-6">
        <img
          src="/graphic.svg"
          alt="Gráfico financeiro"
          className="w-full max-w-md mx-auto" />
      </div>

      <div className="w-full flex flex-row  gap-4 justify-center md:hidden">
        <Button
          variant="contained"
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            minWidth: '160px',
          }}
        >
          Abrir conta
        </Button>

        <Button
          variant="outlined"
          onClick={() => { setIsOpenLoginModal(true) }}
          style={{
            border: '2px solid #000000',
            color: '#000000',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            minWidth: '160px',
          }}
        >
          Já tenho conta
        </Button>
      </div>
    </section>
      <LoginModal open={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
    </>
  )
}
