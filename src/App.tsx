import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import Login from "./routes/login";
import Register from "./routes/register";
import EventList from "./routes/event/list";
import EventAdd from "./routes/event/add";
import EventDetails, { loader as eventLoader } from "./routes/event/details";
import AuthWrapper from "./components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <EventList />
      </AuthWrapper>
    ),
  },
  {
    path: "/event/add",
    element: (
      <AuthWrapper>
        <EventAdd />
      </AuthWrapper>
    ),
  },
  {
    path: "/event/:eventId",
    element: (
      <AuthWrapper>
        <EventDetails />
      </AuthWrapper>
    ),
    loader: eventLoader,
  },
]);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
