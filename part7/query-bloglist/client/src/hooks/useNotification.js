import { useContext } from "react";
import {
  NotificationContext,
  NotificationDispatchContext,
} from "../contexts/notification/NotificationContext";

export function useNotification() {
  return useContext(NotificationContext);
}

export function useNotificationDispatch() {
  return useContext(NotificationDispatchContext);
}
