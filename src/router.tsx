import { createBrowserRouter } from 'react-router-dom'

import Renovacao from './pages/app/clientes'
import Emprestimo from './pages/app/emprestimo'
import LayoutApp from './pages/Layouts/app'

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
])
