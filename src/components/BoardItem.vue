<template>
  <div @click="handleBoardItemClick" class="box-item">
    <img v-if="board.battachoname" :src="battach" class="thumbnail" alt="" />
    <img v-if="!board.battachoname" :src="require('@/assets/no-image.jpg')" class="thumbnail" alt="" />
    <div class="overlay">
      <div class="overlay__text-box">
        <h5 class="overlay__text">{{ board.btitle }}</h5>
        <span class="overlay__text">작성자: {{ board.mid }}</span>
        <span class="overlay__text">{{ new Date(board.bdate).toLocaleDateString() }}</span>
        <span class="overlay__text">조회수: {{ board.bhitcount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import store from "@/store";

const router = useRouter();

const props = defineProps({
  board: Object,
  pageNo: Number,
});

const battach = ref(null);

function handleBoardItemClick() {
  if (!store.state.userId) {
    router.push(`/login`);
    return;
  }
  router.push(`/read?bno=${props.board.bno}&pageNo=${props.pageNo}&hit=true`);
}

async function loadImage(bno) {
  const blob = await apiBoard.download(bno);
  if (blob) battach.value = URL.createObjectURL(blob);
}
loadImage(props.board.bno);
</script>

<style scoped>
.box-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  overflow: hidden;
}
.box-item:hover {
  cursor: pointer;
}
.thumbnail {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform .3s;
}
.box-item:hover .thumbnail{
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1);
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .3s ease;
  background-color: black;
}
.box-item:hover .overlay {
  opacity: 0.6;
}
.overlay__text-box {
  color: white;
  font-size: 0.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
}

</style>
