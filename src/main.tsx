/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import 'uno.css'
import Home from './views/Home.tsx'
import ErrorView from './views/ErrorView.tsx'
import Error404 from './views/Error404.tsx'

const VideoDetailLazy = lazy(() => import('@/views/VideoDetail.tsx'))
const VideolLazy = lazy(() => import('@/components/Video.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
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
    ]
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <ErrorView />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
)
