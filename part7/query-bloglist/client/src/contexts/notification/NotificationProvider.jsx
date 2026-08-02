import { useReducer } from "react";
import {
  NotificationContext,
  NotificationDispatchContext,
} from "./NotificationContext";

const initialNotification = {
  message: "",
  status: "",
};

export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialNotification,
  );

  const notify = (message, status) => {
    dispatch({ type: "notify", notification: { message, status } });
    setTimeout(() => {
      dispatch({ type: "clear" });
    }, 5000);
  };

  return (
    <NotificationContext value={notification}>
      <NotificationDispatchContext value={notify}>
        {children}
      </NotificationDispatchContext>
    </NotificationContext>
  );
}

function notificationReducer(notification, action) {
  switch (action.type) {
    case "notify":
      return action.notification;
    case "clear":
      return initialNotification;
    default:
      return notification;
  }
}
