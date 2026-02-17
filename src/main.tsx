import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CocoShop } from './CocoShop'
import { AuthProvider } from './auth/context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CocoShop />
    </AuthProvider>
  </StrictMode>,
)
