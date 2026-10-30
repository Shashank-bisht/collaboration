import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider } from './api/useGlobalContext'

import Application from './application'
import Loading from './components/loader'

import './styles/css/globals.css'
import './styles/css/custom.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Application />
      </Suspense>
    </AppProvider>
  </React.StrictMode>
)
