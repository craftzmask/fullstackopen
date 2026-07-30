import { createContext, useContext, useReducer } from "react";

export const NotificationContext = createContext(null);
export const NotificationDispatchContext = createContext(null);

export function useNotification() {
  return useContext(NotificationContext);
}

export function useNotificationDispatch() {
  return useContext(NotificationDispatchContext);
}

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
