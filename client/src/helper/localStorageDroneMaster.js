export const getLocalStorage = () => {
  return window.localStorage.getItem("token");
};

export const saveLocalStorageDroneMaster = (key, item) => {
  return window.localStorage.setItem(key, item);
};

export const delLocalStorage = (item) => {
  return window.localStorage.removeItem(item);
};
