import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.component'
import SignUp from './routes/signup/signup.component'
import Auth from './routes/auth/auth.component'
import Layout from './routes/layout/layout.component'
import Home from './routes/home/home.component'
import RedirectRoute from './routes/redirect-route/redirect-route.component'
import Profile from './routes/profile/profile.component'
import Search from './routes/search/search.component'
import Create from './routes/create/create.component'
import Post from './routes/post/post.component'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RedirectRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
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
          element: <Auth />,
          children: [
            { index: true, element: <Login /> },
            { path: '/auth/signup', element: <SignUp /> },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
