import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./states/auth/auth.context.tsx";
import { EventsContextProvider } from "./states/events/events.context.tsx";
import "./firebase.ts";
import { CategoriesContextProvider } from "./states/categories/categories.context.tsx";
import { LocationsContextProvider } from "./states/locations/locations.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <EventsContextProvider>
      <CategoriesContextProvider>
        <LocationsContextProvider>
          <App />
        </LocationsContextProvider>
      </CategoriesContextProvider>
    </EventsContextProvider>
  </AuthContextProvider>
);
