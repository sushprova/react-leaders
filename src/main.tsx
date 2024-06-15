import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import LeadersList from "./components/LeadersList.tsx";
import LeaderDetail from "./components/LeaderDetail.tsx";
import { MessageProvider } from "./context/MessageContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/leaders", element: <LeadersList /> },
      { path: "/leaders/:id", element: <LeaderDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </React.StrictMode>
);
