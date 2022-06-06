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
.tiger-btn {
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  background-color: gold;
  border: 0.25rem solid black;
  height: 4rem;
  padding: 0 1.3rem;
  margin: 0.2rem;
  border-radius: 0.5rem;
  border-width: 0.25rem 0.25rem 0.6rem;
}
.tiger-btn.tiger-btn-sm {
  height: 2rem;
  width: 9rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  border-width: 0.15rem 0.15rem 0.3rem;
  margin: 1rem 0.8rem;
}
.tiger-btn:hover {
  color: inherit;
  background-color: rgb(240, 204, 1);
}
.tiger-btn:active {
  color: inherit;
  border-width: 0.25rem 0.25rem 0.25rem;
  height: 3.7rem;
  transform: translateY(0.3rem);
}
.tiger-btn.tiger-btn-sm:active {
  height: 1.85rem;
  border-radius: 0.3rem;
  border-width: 0.15rem 0.15rem 0.15rem;
  transform: translateY(0.15rem);
}

.tiger-btn.tiger-btn-danger {
  background-color: tomato;
}
.tiger-btn.tiger-btn-secondary {
  background-color: silver;
}


form {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}
label {
  margin: 0.5rem 0;
}
input {
  margin-bottom: 1rem;
}
</style>
