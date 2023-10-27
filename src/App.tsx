import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import Login from "./routes/login";
import Register from "./routes/register";
import EventList from "./routes/event/list";
import EventAdd from "./routes/event/add";
import EventDetails, { loader as eventLoader } from "./routes/event/details";
import AuthWrapper from "./components/AuthWrapper";
import PageWrapper from "./components/PageWrapper";
import './root.css'

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
        <PageWrapper>
          <EventList />
        </PageWrapper>
      </AuthWrapper>
    ),
  },
  {
    path: "/event/add",
    element: (
      <AuthWrapper>
        <PageWrapper>
          <EventAdd />
        </PageWrapper>
      </AuthWrapper>
    ),
  },
  {
    path: "/event/:eventId",
    element: (
      <AuthWrapper>
        <PageWrapper>
          <EventDetails />
        </PageWrapper>
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
