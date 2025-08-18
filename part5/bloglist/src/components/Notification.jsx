import { useNotificationValue } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return null;
  }

  return <div className={notification.status}>{notification.message}</div>;
};

export default Notification;
