/* eslint-disable */
import React from 'react'
import type { RouteObject } from 'react-router-dom'
import LoadingScreen from '../components/loaderComponent/LoadingScreen'

const lazy = React.lazy

const Loadable = (Component: any) => (props: any) =>
(
  <React.Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </React.Suspense>
)

const Layout = Loadable(lazy(() => import('./layout')))

const Home = Loadable(lazy(() => import('../pages/Home/Home')))
const SystemSettings = Loadable(lazy(() => import('../pages/systemSettings/SistemSetting')))




export const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: encodeURI('Home'),
        children: [
          {
            index: true,
            element: (
              <Home />
            ),
          },
        ]
      },
      {
        path: encodeURI('kullanici-ayarlari'),
        children: [
          {
            index: true,
            element: <SystemSettings />,
          },
        ],
      },
    ]
  }
]
