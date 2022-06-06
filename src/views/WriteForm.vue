<template>
  <form @submit.prevent="handleSubmit">
    <label>제목:</label>
    <input v-model="board.btitle" type="text" placeholder="제목을 입력해 주세요."/>
    <label>내용:</label>
    <input v-model="board.bcontent" type="text" placeholder="내용을 간단히 입력해 주세요."/>
    <label>첨부이미지:</label>
    <input ref="imageInput" type="file" />

    <input type="submit" value="작성" class="tiger-btn"/>
    <router-link to="/" class="tiger-btn">취소</router-link>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import store from "@/store";
const router = useRouter();

const imageInput = ref(null);
const board = reactive({
  btitle: "",
  bcontent: "",
});

async function writeBoard() {
  const formData = new FormData();
  formData.append("btitle", board.btitle);
  formData.append("bcontent", board.bcontent);
  formData.append("mid", store.state.userId);
  formData.append("battach", imageInput.value.files[0]);
  const result = await apiBoard.writeBoard(formData);
  if (result) {
    router.push("/");
    console.log(result);
  }
}

function handleSubmit() {
  // 앨범게시판이기 때문에 반드시 이미지를 최소 1개 첨부해야만 하는 정책
  if (imageInput.value.files.length <= 0) {
    alert("이미지가 첨부되지 않았어요.");
    return;
  }
  writeBoard();
}
</script>

<style scoped></style>
