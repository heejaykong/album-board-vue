<template>
  <div v-if="page">
    <router-link v-if="$store.state.userId" :to="`/writeform`" class="tiger-btn tiger-btn-sm">사진 올리기</router-link>
    <section class="boards-section">
      <div v-for="board of page.boards" :key="board.bno">
        <BoardItem :board="board" :pageNo="page.pager.pageNo"></BoardItem>
      </div>
    </section>
    <div class="pagination">
      <button @click="changePageNo(1)">처음</button>
      <button v-if="!(page.pager.groupNo === 1)" @click="changePageNo(page.pager.startPageNo - 1)">이전</button>
      <span v-for="pageNo in range(page.pager.startPageNo, page.pager.endPageNo)" :key="pageNo">
        <button @click="changePageNo(pageNo)">{{ pageNo }}</button>
      </span>
      <button v-if="!(page.pager.groupNo === page.pager.totalGroupNo)" @click="changePageNo(page.pager.endPageNo + 1)">이후</button>
      <button @click="changePageNo(page.pager.totalPageNo)">맨끝</button>
    </div>
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
  if (newURL.path === "/") { // 이 경로일때만 다음처럼 처리
    const pageNo = newURL.query.pageNo ? newURL.query.pageNo : 1;
    getBoards(pageNo);
  }
});

function changePageNo(pageNo) {
  router.push(`/?pageNo=${pageNo}`);
}

function range(start, end) {
  let pageNoRange = [];
  for (let i = start; i <= end; i++) {
    pageNoRange.push(i);
  }
  return pageNoRange;
}

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
  justify-content: center;
  margin-top: 1rem;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.pagination button {
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gold;
  border: 0.25rem solid black;
  padding: 1rem 0.7rem;
  margin: 0.2rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  border-width: 0.15rem 0.15rem 0.3rem;
}
.pagination button:hover {
  color: inherit;
  background-color: rgb(240, 204, 1);
}
.pagination button:active {
  color: inherit;
  height: 1.85rem;
  border-radius: 0.3rem;
  border-width: 0.15rem 0.15rem 0.15rem;
  transform: translateY(0.15rem);
}
</style>
