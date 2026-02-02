import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CocoShop } from './CocoShop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CocoShop />
  </StrictMode>,
)
