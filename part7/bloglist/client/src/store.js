import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  message: "",
  status: "",
  actions: {
    notify: (message, status, durationInSecs = 5) => {
      set(() => ({ message, status }));
      setTimeout(() => {
        set(() => ({ message: "", status: "" }));
      }, durationInSecs * 1000);
    },
  },
}));

export const useNotifcationActions = () => {
  return useNotificationStore((state) => state.actions);
};
