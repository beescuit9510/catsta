import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.component'
import SignUp from './routes/signup/signup.component'
import Auth from './routes/auth/auth.component'
import Layout from './routes/layout/layout.component'
import Home from './components/home/home.component'
import RedirectTo from './routes/redirect-to/redirect-to.component'
import ProtectedRoute from './routes/protected-route/protected-route.component'
import Profile from './routes/profile/profile.component'
import Search from './routes/search/search.component'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/search', element: <Search /> },
        {
          path: '/:userId',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/auth',
      element: (
        <RedirectTo to='/'>
          <Auth />
        </RedirectTo>
      ),
      children: [
        { index: true, element: <Login /> },
        { path: '/auth/signup', element: <SignUp /> },
      ],
    },
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
