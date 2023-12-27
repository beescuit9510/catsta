import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.component'
import SignUp from './routes/signup/signup.component'
import Auth from './routes/auth/auth.component'
import Layout from './routes/layout/layout.component'
import Home from './components/home/home.component'
import Profile from './routes/profile/profile'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/home', element: <Home /> },
        { path: '/profile', element: <Profile /> },
      ],
    },
    { path: '/auth', element: <Auth /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
