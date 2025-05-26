export default function MainLayout({ children }: { children: React.ReactNode }) {

  const menuItems = (
    <>
      <span className="text-[var(--primary-blue)] text-[16px] font-bold border-b-[2px] pb-2">
        Início
      </span>
      <span className="text-[var(--primary-blue)] text-[16px] cursor-pointer lg:border-b-[2px] pb-2">
        Transferências
      </span>
      <span className="text-[var(--primary-blue)] text-[16px] cursor-pointer lg:border-b-[2px] pb-2">
        Investimentos
      </span>
      <span className="text-[var(--primary-blue)] text-[16px] cursor-pointer">
        Outros serviços
      </span>
    </>
  );

  return (
    <div className="min-h-screen bg-[#eaf0e9]">

      <div className="w-full max-w-6xl mx-auto flex gap-4 px-4 py-6">
        <aside className="hidden lg:block w-50 bg-white rounded-lg shadow-md p-8 text-center">
          <nav className="flex flex-col gap-4 text-sm">
            {menuItems}
          </nav>
        </aside>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
