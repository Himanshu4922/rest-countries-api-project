import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App";
import Header from "./components/Header";
import Home from "./components/Home";
import Country from "./components/Country";
import Error from "./components/Error";
import "./global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/:country",
        element: <Country />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <Header /> */}
    <RouterProvider router={router} />
  </>
);
