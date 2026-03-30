import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import Users from './Entities/Users.tsx';
import Task from './Entities/Task.tsx'
import Login from './Entities/Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './service/PrivateRoute.tsx';



const router = createBrowserRouter([
  {

    path: "/",
    element: <Login />
  },
  {
    path: "home",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children:[
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "task",
        element: <Task/>,
      }
    ]
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router} />

  </StrictMode>,
)
