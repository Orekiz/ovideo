/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import 'uno.css'
import App from './App.tsx'

const VideoDetailLazy = lazy(() => import('@/views/VideoDetail.tsx'))
const VideolLazy = lazy(() => import('@/components/Video.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/video/:id',
    element: <Suspense fallback={<>loading...</>}><VideoDetailLazy /></Suspense>,
    children: [
      {
        path: ':ep',
        element: <Suspense fallback={<>loading...</>}><VideolLazy /></Suspense>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
)
