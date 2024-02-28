import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

/*
REACT HOOK FORM
https://www.youtube.com/watch?v=cc_xmawJ8Kg
*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
)