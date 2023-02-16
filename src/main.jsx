import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./style/main.css"
import Index from "./Index"
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Clients from './routes/Clients'
import ClientInfo from "./routes/ClientInfo"
import CombosInfo from "./routes/CombosInfo"
import MovieInfo from './routes/MovieInfo'
import Login from './routes/Login'
import Authenticator from './routes/Authenticator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cadastro',
        element: <Clients />
      },
      {
        path: "/filmes/:id",
        element: <MovieInfo/>
      },
      {
        path: "/combos/:id",
        element: <CombosInfo/>
      },   
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/clientes/:id",
        element: <ClientInfo/>
      },
      {
        path: "/auth",
        element: <Authenticator/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
