import { createContext } from "react";

const NotificationContext = createContext({
  notification: "",
  setNotification: () => {}, // empty dummy function
});

export default NotificationContext;
