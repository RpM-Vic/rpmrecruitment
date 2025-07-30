import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
// import { router } from './routes'
import {  router2 } from './routes'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router2}>

    </RouterProvider>
  </StrictMode>,
)
