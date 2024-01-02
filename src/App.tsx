import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.component'
import SignUp from './routes/signup/signup.component'
import Auth from './routes/auth/auth.component'
import Layout from './routes/layout/layout.component'
// import Home from './routes/home/home.component'
import RedirectTo from './routes/redirect-to/redirect-to.component'
import ProtectedRoute from './routes/protected-route/protected-route.component'
import Profile from './routes/profile/profile.component'
import Search from './routes/search/search.component'
import Create from './routes/create/create.component'
import Post from './routes/post/post.component'

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
        // { path: '/', element: <Home /> },
        { path: '/search', element: <Search /> },
        { path: '/create', element: <Create /> },
        {
          path: '/:userId',
          element: <Profile />,
        },
        { path: '/posts/:postId', element: <Post /> },
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
