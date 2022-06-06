<template>
  <AppHeader />
  <router-view />
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { useStore } from "vuex";
const store = useStore();

// 이러면 브라우저를 새로고침해도 로그인상태가 풀리지 않는다.
store.dispatch("loadAuth");
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
