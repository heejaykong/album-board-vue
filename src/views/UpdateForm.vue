<template>
  <div v-if="board">
    <form @submit.prevent="handleUpdate">
      제목:
      <input v-model="board.btitle" type="text" />
      내용:
      <input v-model="board.bcontent" type="text" />
      첨부이미지:
      <input ref="newBattach" @change="handleInputChange" type="file" />
      <div v-if="board.battachoname">
        <img :src="battach" alt="" />
      </div>

      <input type="submit" value="수정" class="tiger-btn"/>
      <router-link :to="`/read?bno=${bno}&pageNo=${pageNo}&hit=false`" class="tiger-btn tiger-btn-secondary">취소</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiBoard from "@/apis/board";
const route = useRoute();
const router = useRouter();

const battach = ref(null);
const newBattach = ref(null);
const board = ref(null);

const bno = route.query.bno;
const pageNo = route.query.pageNo;

function handleInputChange() {
  battach.value = URL.createObjectURL(newBattach.value.files[0]);
}

async function handleUpdate() {
  const formData = new FormData();
  formData.append("bno", board.value.bno);
  formData.append("btitle", board.value.btitle);
  formData.append("bcontent", board.value.bcontent);
  if (newBattach.value.files.length > 0) {
    // 이미지도 수정됐다면
    formData.append("battach", newBattach.value.files[0]);
  }
  const result = await apiBoard.updateBoard(formData);
  if (result) {
    router.push(`/read?bno=${bno}&pageNo=${pageNo}&hit=false`);
    console.log(result);
  }
}

async function loadImage(bno) {
  const blob = await apiBoard.download(bno);
  if (blob) battach.value = URL.createObjectURL(blob);
}
loadImage(bno);

async function getBoard() {
  const result = await apiBoard.getBoard(bno, false);
  board.value = result;
}
getBoard();
</script>

<style scoped></style>
