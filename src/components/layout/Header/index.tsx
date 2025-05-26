import { FaUserCircle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'

type Props = {
  onToggleMenu: () => void
}

export default function Header({ onToggleMenu }: Props) {
  return (
    <div className="bg-[var(--primary-blue)] text-white px-6 py-4 flex items-center justify-between">
      <button 
        onClick={onToggleMenu}
        className="md:hidden text-xl"
      >
        <FiMenu />
      </button>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm">Joana da Silva Oliveira</span>
        <FaUserCircle className="text-xl" />
      </div>
    </div>
  )
}
