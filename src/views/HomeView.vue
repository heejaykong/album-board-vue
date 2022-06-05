<template>
  <div v-if="page">
    <section class="boards-section">
      <router-link :to="`/writeform`">글을 작성해요</router-link>
      <div v-for="board of page.boards" :key="board.bno">
        <BoardItem :board="board" :pageNo="page.pager.pageNo"></BoardItem>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import BoardItem from "@/components/BoardItem.vue";
import apiBoard from "@/apis/board";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const page = ref(null);

watch(route, (newURL, oldURL) => {
  const pageNo = newURL.query.pageNo ? newURL.query.pageNo : 1;
  getBoards(pageNo);
});

async function getBoards(pageNo) {
  const result = await apiBoard.getBoards(pageNo);
  page.value = result;
}

function init() {
  const pageNo = route.query.pageNo ? route.query.pageNo : 1;
  getBoards(pageNo);
}
init();
</script>

<style scoped>
.boards-section {
  display: flex;
  flex-wrap: wrap;
}
.temp {
  background-color: black;
}
</style>
