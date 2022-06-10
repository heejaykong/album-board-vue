<template>
  <ModalDialogTemplate style="width: 400px">
    <template v-slot:header> 알림 </template>
    <template v-slot:body>
      <!-- 로딩 시 스피너 보여주기 -->
      <div v-if="loading" class="mt-3">
        <div class="spinner-border text-info" role="status">
          <!-- <span class="sr-only">Loading...</span> -->
        </div>
      </div>
      
      <!-- 로딩 끝나면 메시지 보여주기 -->
      <div v-if="!loading">{{ message }}</div>
    </template>
    <template v-slot:footer>
      <button @click="$emit('close')" class="modal-default-button">닫기</button>
    </template>
  </ModalDialogTemplate>
</template>

<script setup>
import ModalDialogTemplate from "./ModalDialogTemplate.vue";
import {ref} from 'vue';

const props = defineProps({
  message: String,
  loading: Boolean
});
</script>

<style scoped></style>
