import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./states/auth/auth.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
