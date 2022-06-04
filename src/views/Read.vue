<template>
  <div v-if="board">
    <div class="box-item">
      <div v-if="board.battachoname" class="thumbnail">
        <img :src="battach" width="300" alt="" />
      </div>
      <span>{{ board.btitle }}</span>
      <span>작성자: {{ board.mid }}</span>
      <span>작성일: {{ new Date(board.bdate).toLocaleDateString() }}</span>
      <span>조회수: {{ board.bhitcount }}</span>
      <router-link :to="``">목록</router-link>
      <router-link :to="`/updateform?bno=${bno}`">수정</router-link>
      <button @click="handleRemove">삭제</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiBoard from "@/apis/board";

const SUCCESS_MESSAGE = "successful";
const FAIL_MESSAGE = "failed";

const route = useRoute();
const router = useRouter();

const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;

const board = ref(null);
const battach = ref(null);

async function handleRemove() {
  const result = await apiBoard.deleteBoard(bno);
  if (result.result === SUCCESS_MESSAGE) {
    router.push(`/?pageNo=${pageNo}`);
  }
}

async function loadImage(bno) {
  const blob = await apiBoard.download(bno);
  if (blob) battach.value = URL.createObjectURL(blob);
}
loadImage(bno);

async function getBoard() {
  const result = await apiBoard.getBoard(bno, hit);
  board.value = result;
}
getBoard();
</script>

<style scoped>
.box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
