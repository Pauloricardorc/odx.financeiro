import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

export default function LayoutApp() {
  const [getSession] = useCookies(['session'])

  return (
    !getSession.session && (
      <div className="flex h-screen w-screen flex-col font-nunito">
        <Header />

        <div className="flex flex-1 flex-col gap-6 p-4">
          <Outlet />
        </div>
      </div>
    )
  )
}
