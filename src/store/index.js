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
    // 기존 인증정보 가져오기(앱 처음 로딩할때 호출)
    loadAuth(context, payload) {
      context.commit("setUserId", sessionStorage.getItem("userId") || "");
      context.commit("setAuthToken", sessionStorage.getItem("authToken") || "");

      if (context.state.authToken) {
        // *** 가장 중요 ***
        axiosConfig.addAuthHeader(context.state.authToken);
      }
    },
    // 로그인 성공시
    saveAuth(context, payload) {
      context.commit("setUserId", payload.userId);
      context.commit("setAuthToken", payload.authToken);

      sessionStorage.setItem("userId", payload.userId);
      sessionStorage.setItem("authToken", payload.authToken);

      // *** 가장 중요 ***
      axiosConfig.addAuthHeader(payload.authToken);
    },
    // 로그아웃 시
    deleteAuth(context, payload) {
      context.commit("setUserId", "");
      context.commit("setAuthToken", "");

      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("authToken");

      // *** 가장 중요 ***
      axiosConfig.removeAuthHeader();
    },
  },
  modules: {},
});
