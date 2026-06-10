import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import './index.css'
import App from './App.tsx'
import { WalletProvider } from './lib/wallet'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position="top-center" richColors closeButton />
    </WalletProvider>
  </StrictMode>,
)
