<template>
  <header class="header">
    <div class="header__col">
      <router-link to="/" id="logo">🐱</router-link>
    </div>
    <div class="header__col">
      <button class="tiger-btn">로그아웃</button>
      <router-link to="/join" class="tiger-btn">회원가입</router-link>
    </div>
  </header>
</template>

<script setup></script>

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
}
#logo {
  font-size: 3rem;
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
  border-radius: 0.45rem;
  border-width: 0.25rem 0.25rem 0.6rem;
  height: 4rem;
  padding: 0 1.3rem;
  margin: 0.2rem;
}
.tiger-btn:hover {
  background-color: rgb(240, 204, 1);
}
.tiger-btn:active {
  border-width: 0.25rem 0.25rem 0.25rem;
  height: 3.7rem;
  transform: translateY(0.3rem);
}
</style>
