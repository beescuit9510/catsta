import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.component'
import SignUp from './routes/signup/signup.component'
import Auth from './routes/auth/auth.component'
import Layout from './routes/layout/layout.component'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [],
    },
    { path: '/auth', element: <Auth /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
