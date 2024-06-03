import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { Router } from './router'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ctr-financeiro-theme">
      {' '}
      <RouterProvider router={Router} />
    </ThemeProvider>
  )
}
