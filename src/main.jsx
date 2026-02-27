import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserDataUpdateForm from "./pages/UserDataUpdateForm.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import SavedBlogs from "./pages/SavedBlogs.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/updateProfileData",
        element: <UserDataUpdateForm />,
      },
      {
        path: "/createBlog",
        element: <CreateBlog />,
      },
      {
        path: '/savedBlogs',
        element: <SavedBlogs />,
      }
    ],
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
