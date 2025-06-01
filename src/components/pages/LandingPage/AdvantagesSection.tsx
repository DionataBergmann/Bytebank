const advantages = [
  {
    icon: '/gift.svg',
    title: 'Conta e cartão gratuitos',
    desc: 'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.'
  },
  {
    icon: '/money.svg',
    title: 'Saques sem custo',
    desc: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.'
  },
  {
    icon: '/points.svg',
    title: 'Programa de pontos',
    desc: 'Acumule pontos nas compras com crédito sem pagar mensalidade.'
  },
  {
    icon: '/devices.svg',
    title: 'Seguro Dispositivos',
    desc: 'Seus dispositivos protegidos por uma mensalidade simbólica.'
  },
]

export default function AdvantagesSection() {
  return (
    <section className="bg-transparent py-10 px-4">
      <h2 className="text-center text-xl md:text-2xl font-bold text-black mb-8">
        Vantagens do nosso banco:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {advantages.map((item, i) => (
          <div key={i} className="text-center">
            <img src={item.icon} alt={item.title} className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-[var(--may-green)] text-[20px] mb-2">{item.title}</h3>
            <p className="text-[16px] text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
