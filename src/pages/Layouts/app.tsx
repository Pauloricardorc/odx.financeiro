import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

export default function LayoutApp() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <Outlet />
      </div>
    </div>
  )
}
