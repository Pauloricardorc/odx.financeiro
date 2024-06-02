import { createBrowserRouter } from 'react-router-dom'

import Renovacao from './pages/app/clientes'
import Emprestimo from './pages/app/emprestimo'
import { Login } from './pages/app/login'
import LayoutApp from './pages/Layouts/app'
import { SignInLayout } from './pages/Layouts/AuthLayout'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        path: '/',
        element: <Emprestimo />,
      },
      {
        path: '/clientes',
        element: <Renovacao />,
      },
    ],
  },
  {
    path: '/',
    element: <SignInLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])
