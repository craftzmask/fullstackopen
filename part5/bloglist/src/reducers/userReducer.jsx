import { useReducer, useContext, createContext, useEffect } from "react";
import blogService from "../services/blogs";

const init = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE": {
      return action.payload;
    }
    case "REMOVE": {
      return null;
    }
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, null, init);

  // Side-effects: keep localStorage & axios token in sync
  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      blogService.setToken(null);
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUsernValue = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[0];
};

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[1];
};
