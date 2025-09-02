import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { store } from './redux/store.ts'
import { Provider as ReduxProvider } from "react-redux"
import { Toaster } from "@/components/ui/sonner"
import { router } from "@/routes/index.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors={true} />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
