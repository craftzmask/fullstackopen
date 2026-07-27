import { Alert } from "@mui/material";
import { useNotificationStore } from "../store";

const Notification = () => {
  const { message, status } = useNotificationStore();

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
