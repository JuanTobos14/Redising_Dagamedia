import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Importar configuración de i18n para activar el sistema de traducciones
import './config'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
