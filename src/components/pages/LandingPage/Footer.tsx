export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="text-left">
          <h4 className="font-bold mb-2 text-[16px] text-white">Serviços</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Conta corrente</li>
            <li>Conta PJ</li>
            <li>Cartão de crédito</li>
          </ul>
        </div>

        <div className="text-left">
          <h4 className="font-bold mb-2 text-[16px] text-white">Contato</h4>
          <ul className="space-y-1 text-gray-300">
            <li>0800 004 250 08</li>
            <li>meajuda@bytebank.com.br</li>
            <li>ouvidoria@bytebank.com.br</li>
          </ul>
        </div>

        <div className="text-left md:text-right">
          <p className="mb-1 text-gray-400 font-bold">Desenvolvido por Alura</p>

          <div className="flex justify-start md:justify-end items-center gap-2 mb-2 mt-4">
            <img src="/logo-white.svg" alt="Bytebank logo" />
          </div>

          <div className="flex justify-start md:justify-end gap-4 mt-4">
            <a href="#" aria-label="Instagram">
              <img src="/Instagram.svg" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="WhatsApp">
              <img src="/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src="/YouTube.svg" alt="YouTube" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
