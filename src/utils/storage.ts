const storagePrefix = "bulletproof_react_";

const storage = {
  getToken: () => {
    return window.localStorage.getItem("token");
  },
  setToken: (token: string) => {
    window.localStorage.setItem("token", JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem("token");
  },
};

export default storage;
