import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Container>
      <App />
    </Container>
  </Router>,
);
