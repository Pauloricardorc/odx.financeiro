import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/header'

export default function LayoutApp() {
  const navigate = useNavigate()
  const [getSession] = useCookies(['session'])

  useEffect(() => {
    if (!getSession.session) {
      return navigate('/login')
    }
  }, [getSession.session, navigate])

  return (
    getSession.session && (
      <div className="font-nunito flex h-screen w-screen flex-col">
        <Header />

        <div className="flex flex-1 flex-col gap-6 p-4">
          <Outlet />
        </div>
      </div>
    )
  )
}
