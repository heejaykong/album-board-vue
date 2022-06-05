<template>
  <div v-if="page">
    <section class="boards-section">
      <router-link :to="`/writeform`">글을 작성해요</router-link>
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
}
.temp {
  background-color: black;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
