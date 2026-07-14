import { Alert } from "@mui/material";

const Notification = ({ message, status }) => {
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
