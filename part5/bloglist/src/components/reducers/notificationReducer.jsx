import { useReducer, createContext, useContext } from "react";

const initialState = {
  message: "",
  status: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "REMOVE":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={[value, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[1];
};
