import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./states/auth/auth.context.tsx";
import { EventsContextProvider } from "./states/events/events.context.tsx";
import './firebase.ts';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </AuthContextProvider>
);
