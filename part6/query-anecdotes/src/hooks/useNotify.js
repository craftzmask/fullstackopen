import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const useNotify = (durationInSec = 5) => {
  const { message, setMessage } = useContext(NotificationContext);

  const notify = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage("");
    }, durationInSec * 1000);
  };

  return { message, notify };
};

export default useNotify;
