import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// axios.defaults.baseURL 을 먼저 적용하기 위해 import.
// 브라우저 리프레시할 때 apis를 이용하는 페이지가 있을 수 있기 때문.
import axiosConfig from "@/apis/axiosConfig";

createApp(App).use(store).use(router).mount("#app");
