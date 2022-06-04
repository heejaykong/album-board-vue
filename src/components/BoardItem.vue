<template>
  <div class="box-item">
    <router-link :to="`/read?bno=${board.bno}&pageNo=${pageNo}&hit=true`">
      <div v-if="board.battachoname" class="thumbnail">
        <img :src="battach" width="200" height="200" alt="" />
      </div>
      <div v-if="!board.battachoname" class="thumbnail">
        <img :src="require('@/assets/no-image.jpg')" width="300" alt="" />
      </div>
      <span>{{ board.btitle }}</span>
      <span>{{ board.mid }}</span>
      <span>{{ new Date(board.bdate).toLocaleDateString() }}</span>
      <span>{{ board.bhitcount }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import apiBoard from "@/apis/board";

const props = defineProps({
  board: Object,
  pageNo: Number,
});

const battach = ref(null);

async function loadImage(bno) {
  const blob = await apiBoard.download(bno);
  if (blob) battach.value = URL.createObjectURL(blob);
}
loadImage(props.board.bno);
</script>

<style scoped>
.box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-item:hover {
  background-color: black;
}
</style>
