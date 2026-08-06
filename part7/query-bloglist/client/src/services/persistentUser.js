const USER_LOCAL_STORAGE_KEY = "user";

export const getUser = () => {
  const cachedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  return null;
};

export const saveUser = (user) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
