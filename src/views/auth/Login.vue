<template>
  <form @submit.prevent="handleLogin">
    아이디:
    <input type="text" v-model="user.mid" placeholder="아이디를 입력해 주세요."/>
    비밀번호:
    <input type="text" v-model="user.mpassword" placeholder="비밀번호를 입력해 주세요."/>
    <input type="submit" value="로그인"  class="tiger-btn"/>
  </form>
  <AlertDialog
    @close="showAlertDialog=false"
    v-if="showAlertDialog"
    :message="dialogMessage"
    :loading="loading"/>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import apiAuth from "@/apis/auth";
import AlertDialog from "@/components/AlertDialog.vue";
const router = useRouter();

const FAIL_MESSAGE_NETWORK = "fail-network";
const FAIL_MESSAGE_401 = "fail-401";
const SUCCESS_MESSAGE = "successful";

const showAlertDialog = ref(false);
const dialogMessage = ref("");
const loading = ref(false);

const user = reactive({
  mid: "user",
  mpassword: "12345",
});

async function handleLogin() {
  showAlertDialog.value = true;
  loading.value = true;

  const result = await apiAuth.login(user);
  if (result === FAIL_MESSAGE_NETWORK) {
    dialogMessage.value = FAIL_MESSAGE_NETWORK
  }
  if (result === FAIL_MESSAGE_401) {
    dialogMessage.value = FAIL_MESSAGE_401
  }
  if (result === SUCCESS_MESSAGE) {
    // dialogMessage.value = SUCCESS_MESSAGE
    showAlertDialog.value = false;
    router.push("/");
  }
  loading.value = false;
}
</script>

<style scoped></style>
