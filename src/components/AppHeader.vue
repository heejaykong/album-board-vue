<template>
  <header class="header">
    <div class="header__col">
      <router-link to="/" id="logo">🐱<span class="title">앨범게시판</span></router-link>
    </div>
    <div class="header__col">
      <span v-if="$store.state.userId" class="greetings"><span id="userid">{{$store.state.userId}}</span> 님 안녕하세요!</span>
      <router-link v-if="!$store.state.userId" to="/login" class="tiger-btn">로그인</router-link>
      <button v-if="$store.state.userId" @click="handleLogout" class="tiger-btn">로그아웃</button>
      <router-link v-if="!$store.state.userId" to="/join" class="tiger-btn">회원가입</router-link>
    </div>
  </header>
</template>

<script setup>
import apiAuth from "@/apis/auth";
import { useRouter } from "vue-router";
const router = useRouter();

async function handleLogout() {
  await apiAuth.logout();
  router.push("/");
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  height: 8rem;
  border-bottom: 1px solid lightgray;
}
.header__col {
  display: flex;
  align-items: center;
}
#logo {
  font-size: 3rem;
  color: black;
  display: flex;
  align-items: center;
}
.title {
  color: inherit;
  font-size: 1.2rem;
  font-weight: 600;
}
.greetings {
  display: inline-block;
  font-size: 1.2rem;
  margin-right: 1rem;
}
.greetings #userid {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
