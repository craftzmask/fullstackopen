import { useNotificationValue } from "../reducers/notificationReducer";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return null;
  }

  return (
    <Alert severity={notification.status} sx={{ mb: 3 }}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
