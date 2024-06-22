import { ScanFace } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function SignInLayout() {
  return (
    <div className="flex gap-3 antialiased">
      <div className="hidden min-w-[480px] border-r p-8 lg:flex lg:flex-1">
        <div className="flex h-full flex-col">
          <div className="flex h-full items-start justify-start gap-3">
            <div className="flex items-center gap-3">
              <ScanFace />
              <p className="text-2xl font-bold">Controle Financeiro</p>
            </div>
          </div>
          <div className="flex max-w-[400px] flex-col gap-3">
            <p className="text-lg font-medium tracking-normal">
              Painel administrativo para o gerenciamento de empréstimos.
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-screen w-full max-w-full flex-col p-4 xl:min-w-[500px] xl:max-w-[300px]">
        <Outlet />
      </div>
    </div>
  )
}
