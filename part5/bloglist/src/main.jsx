import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContextProvider } from "./reducers/notificationReducer";
import { UserContextProvider } from "./reducers/userReducer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
