import { RouteObject, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ListItems from "../components/ListItems";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Providers from "../Providers";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";
import Budgets from "../pages/Budgets";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // Auth Protected routes
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/test",
            element: <ListItems />,
          },
        ],
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/transactions",
            element: <Transactions />,
          },
        ],
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/budgets",
            element: <Budgets />,
          },
        ],
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
