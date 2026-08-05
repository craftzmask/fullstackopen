import { useContext } from "react";
import { UserContext, UserDispatchContext } from "../contexts/user/UserContext";

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserActions = () => {
  return useContext(UserDispatchContext);
};
