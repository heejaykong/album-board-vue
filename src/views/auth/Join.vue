<template>
  <form @submit.prevent="handleJoin" class="temp">
    아이디:
    <input type="text" v-model="user.mid" placeholder="아이디를 입력해 주세요."/>
    이름:
    <input type="text" v-model="user.mname" placeholder="이름을 입력해 주세요."/>
    비밀번호:
    <input type="text" v-model="user.mpassword" placeholder="비밀번호를 입력해 주세요."/>
    <label>User Role:</label>
    <select v-model="user.mrole">
      <option value="ROLE_ADMIN">ROLE_ADMIN</option>
      <option value="ROLE_MANAGER">ROLE_MANAGER</option>
      <option value="ROLE_USER" selected>ROLE_USER</option>
    </select>
    이메일:
    <input type="text" v-model="user.memail" placeholder="이메일을 입력해 주세요."/>

    <input type="submit" value="가입하기"  class="tiger-btn"/>
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

// successful, duplicated, failed
const SUCCESS_MESSAGE = "successful";
const FAIL_MESSAGE_DUPLICATED = "duplicated";
const FAIL_MESSAGE_FAILED = "failed";
const FAIL_MESSAGE_NETWORK = "fail-network";

const showAlertDialog = ref(false);
const dialogMessage = ref("");
const loading = ref(false);

const user = reactive({
  mid: "user",
  mname: "사용자",
  mpassword: "12345",
  mrole: "ROLE_USER",
  memail: "user@mycompany.com",
});

async function handleJoin() {
  showAlertDialog.value = true;
  loading.value = true;
  const result = await apiAuth.join(user);
  if (result === FAIL_MESSAGE_NETWORK) {
    dialogMessage.value = FAIL_MESSAGE_NETWORK
  }
  if (result === FAIL_MESSAGE_DUPLICATED) {
    dialogMessage.value = FAIL_MESSAGE_DUPLICATED
  }
  if (result === FAIL_MESSAGE_FAILED) {
    dialogMessage.value = FAIL_MESSAGE_FAILED
  }
  if (result === SUCCESS_MESSAGE) {
    // dialogMessage.value = SUCCESS_MESSAGE
    router.push("/");
  }
  loading.value = false;
}
</script>

<style scoped>
.temp {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
</style>
