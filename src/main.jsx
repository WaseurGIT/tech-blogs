import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute user={user}>
  //       {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
  //     </ProtectedRoute>
  //   ),
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
