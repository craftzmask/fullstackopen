import { Alert } from "@mui/material";
import { useNotification } from "../hooks/useNotification";

const Notification = () => {
  const { message, status } = useNotification();

  if (!message || message === "") {
    return null;
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={status}>
      {message}
    </Alert>
  );
};

export default Notification;
