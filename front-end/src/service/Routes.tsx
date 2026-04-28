import { createBrowserRouter } from "react-router-dom";
import Login from "../Entities/Login";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import Home from "../Entities/Home";
import Users from "../Entities/Users";
import Task from "../Entities/Task";

 export const router = createBrowserRouter([
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
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "task",
        element: <Task />,
      }
    ]
  },

])