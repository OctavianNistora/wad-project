/* existing imports */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ReactDOM from "react-dom/client";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
