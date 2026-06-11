// Buffer polyfill is now handled primarily by vite-plugin-node-polyfills
// This ensures it for any edge cases before Solana libs load
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer
if (typeof window !== 'undefined') {
  ;(window as { Buffer?: typeof Buffer }).Buffer = Buffer
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import './index.css'
import '@solana/wallet-adapter-react-ui/styles.css'
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
