import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Container>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Container>
  </Router>,
);
