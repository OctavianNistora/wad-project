import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import Auth from "./routes/auth";
import Register from "./routes/register";
import EventList from "./routes/event/list";
import { CounterContextProvider } from "./states/counter.context";
import EventAdd from "./routes/event/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/event/list",
    element: <EventList />,
  },
  {
    path: "/event/add",
    element: <EventAdd />,
  },
]);

function App() {
  return (
    <CounterContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CounterContextProvider>
  );
}

export default App;
