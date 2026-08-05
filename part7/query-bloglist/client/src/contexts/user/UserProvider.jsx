import { useCallback, useReducer } from "react";
import { UserContext, UserDispatchContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  const setUser = useCallback((user) => {
    dispatch({ type: "set", user });
  }, []);

  const clearUser = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  return (
    <UserContext value={user}>
      <UserDispatchContext value={{ setUser, clearUser }}>
        {children}
      </UserDispatchContext>
    </UserContext>
  );
};

function userReducer(user, action) {
  switch (action.type) {
    case "set":
      return action.user;
    case "clear":
      return null;
    default:
      return user;
  }
}
