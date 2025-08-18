import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContextProvider } from "./components/reducers/notificationReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
