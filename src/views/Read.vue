<template>
  <div v-if="board">
  <main>
    <div class="box-item">
      <img v-if="board.battachoname" :src="battach" alt=""/>
      <div class="content">
        <span>제목: <strong>{{ board.btitle }}</strong></span>
        <span>내용: <strong>{{ board.bcontent }}</strong></span>
        <span>작성자: <strong>{{ board.mid }}</strong></span>
        <span>작성일: <strong>{{ new Date(board.bdate).toLocaleDateString() }}</strong></span>
        <span>조회수: <strong>{{ board.bhitcount }}</strong></span>
      </div>
      <div class="buttons">
        <router-link :to="`/?pageNo=${pageNo}`" class="tiger-btn">목록</router-link>
        <router-link v-if="isMyBoard()" :to="`/updateform?bno=${bno}&pageNo=${pageNo}`" class="tiger-btn">수정</router-link>
        <button v-if="isMyBoard()" @click="handleRemove" class="tiger-btn tiger-btn-danger">삭제</button>
      </div>
    </div>
  </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import store from "@/store";

const SUCCESS_MESSAGE = "successful";
const FAIL_MESSAGE = "failed";

const route = useRoute();
const router = useRouter();

const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;

const board = ref(null);
const battach = ref(null);

function isMyBoard() {
  if (board.value.mid === store.state.userId) return true;
  return false
}

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
main {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-item {
  display: flex;
  flex-direction: column;
}
img {
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 1.2rem;
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
