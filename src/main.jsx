import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/blogs',
        element: <Blogs/>
      },
      {
        path: '/blogs/:id',
        element: <BlogDetail/>
      }
    ]
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
    <RouterProvider router={router} />
  </StrictMode>,
);
