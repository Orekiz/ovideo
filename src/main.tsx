import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import 'uno.css'
import App from './App.tsx'
// import Home from './views/Home'

// eslint-disable-next-line react-refresh/only-export-components
const VideoDetailLazy = lazy(() => import('@/views/VideoDetail.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/video/:id',
    element: <Suspense fallback={<>loading...</>}><VideoDetailLazy /></Suspense>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
)
