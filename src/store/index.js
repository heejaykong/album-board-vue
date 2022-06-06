import axiosConfig from "@/apis/axiosConfig";
import { createStore } from "vuex";

export default createStore({
  state: {
    userId: "",
    authToken: "",
  },
  getters: {
    getUserId(state, getters, rootState, rootGetters) {
      return state.userId;
    },
    getAuthToken(state, getters, rootState, rootGetters) {
      return state.authToken;
    },
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    setAuthToken(state, payload) {
      state.authToken = payload;
    },
  },
  actions: {
    saveAuth(context, payload) {
      context.commit("setUserId", payload.userId);
      context.commit("setAuthToken", payload.authToken);

      sessionStorage.setItem("userId", payload.userId);
      sessionStorage.setItem("authToken", payload.authToken);

      // *** 가장 중요 ***
      axiosConfig.addAuthHeader(payload.authToken);
    },
  },
  modules: {},
});
