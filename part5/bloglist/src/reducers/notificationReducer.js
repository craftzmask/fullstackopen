import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  status: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const notify = (message, status, durationInSec = 5) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, status }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, durationInSec * 1000);
  };
};

export default notificationSlice.reducer;
