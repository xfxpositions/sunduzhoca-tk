import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { EncryptStorage } from "encrypt-storage";

const encryptSessionStorage = new EncryptStorage("secret-key", {
  storageType: "sessionStorage",
});
const encryptLocalStorage = new EncryptStorage("secret-key", {
  storageType: "localStorage",
});
const rememberMe = localStorage.getItem("rememberMe");
console.log(typeof rememberMe);
const store = createStore({
  state: {
    user: null,
    rememberMe: null,
  },
  getters: {
    _isAuthenticated: (state) => {
      return state.user != null;
    },
    _getCurrentUser(state) {
      const user = state.user;
      delete user?.password;
      return user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRemember(state, remember) {
      state.rememberMe = remember;
    },
    setAvatar(state, avatar) {
      state.user.avatar = avatar;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem(key) {
          if (rememberMe == "true") {
            return encryptLocalStorage.getItem(key);
          } else {
            return encryptSessionStorage.getItem(key);
          }
        },
        setItem(key, value) {
          if (rememberMe == "true") {
            return encryptLocalStorage.setItem(key, value);
          } else {
            return encryptSessionStorage.setItem(key, value);
          }
        },
        removeItem(key) {
          if (rememberMe == "true") {
            return encryptLocalStorage.removeItem(key);
          } else {
            return encryptSessionStorage.removeItem(key);
          }
        },
      },
    }),
  ],
});

export default store;
