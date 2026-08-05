import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import App from "./App";
import "./index.css";
import { NotificationProvider } from "./contexts/notification/NotificationProvider";
import { UserProvider } from "./contexts/user/UserProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Container>
        <UserProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UserProvider>
      </Container>
    </Router>
  </QueryClientProvider>,
);
