// import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import 'uno.css'
import VideoDetail from './views/VideoDetail.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/video/:id',
    element: <VideoDetail />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
)
