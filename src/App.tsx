import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import Auth from "./routes/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
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
