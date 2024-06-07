import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { Toaster as Sonnar } from '@/components/ui/sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/toaster'
import { Router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchInterval: 5 * 1000 * 60,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ctr-financeiro-theme">
        <Toaster />
        <Sonnar />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
