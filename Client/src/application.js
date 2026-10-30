import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

const HomeLayout = lazy(() => import('./layouts/home'))
const AppLayout = lazy(() => import('./layouts/app'))

const Index = lazy(() => import('./pages/index'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const Error = lazy(() => import('./pages/error'))

const App = lazy(() => import('./pages/app'))
const Folders = lazy(() => import('./pages/app/folders'))
const Bookmark = lazy(() => import('./pages/app/bookmark'))
const Shares = lazy(() => import('./pages/app/shares'))
const SharedWithMe = lazy(() => import('./pages/app/sharedWithMe'))
const ReadShare = lazy(() => import('./pages/app/readShare'))
const Favorites = lazy(() => import('./pages/app/favorites'))
const Archive = lazy(() => import('./pages/app/archives'))
const Trash = lazy(() => import('./pages/app/trashs'))
const Redirect = lazy(() => import('./pages/app/redirect'))

// // Note: if you want to change '/api' to something else, you have to change it in server/index.js too for production
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    ),
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
  {
    path: '/app',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'folders/:folderId',
        element: <Folders />,
      },
      {
        path: 'bookmark',
        element: <Bookmark />,
      },
      {
        path: 'shared',
        element: <Shares />,
      },
      {
        path: 'shared-with-me',
        element: <SharedWithMe />,
      },
      {
        path: 'share/:shareId',
        element: <ReadShare />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'archive',
        element: <Archive />,
      },
      {
        path: 'trash',
        element: <Trash />,
      },
      {
        path: '*',
        element: <Redirect />,
      },
    ],
  },
])

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
