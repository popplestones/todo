<script lang="ts" setup>
import { getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/tauri";
import { computed, onMounted, ref } from "vue";
import LoginForm from "./components/LoginForm.vue";
import Notification from "./components/Notification.vue";
import RegisterForm from "./components/RegisterForm.vue";
import TaskList from "./components/TaskList.vue";
import useAuth from "./composables/useAuth.ts";

const appVersion = ref("");

const hasAccount = ref<boolean>(true);

const handleRegistered = () => {
  hasAccount.value = true;
};

const handleNotRegistered = () => {
  hasAccount.value = false;
};

const handleLogout = async () => {
  await logout();
};

const showLogin = computed(() => {
  return !state.isLoggedIn && hasAccount.value;
});

const showRegister = computed(() => {
  return !state.isLoggedIn && !hasAccount.value;
});

const showTasks = computed(() => {
  return state.isLoggedIn;
});

const { verifyToken, state, logout } = useAuth();

onMounted(async () => {
  appVersion.value = await getVersion();
  state.token = await invoke("get_token");
  state.isLoggedIn = await verifyToken();
});

// const notify = () => {
//   // notificationStore.showNotification("Test");
//   notificationStore.showNotification("Test", "error");
//   // notificationStore.showNotification("Test", "info");
//
// }
</script>

<template>
  <div class="bg-gray-900 h-screen flex flex-col">
    <div class="flex justify-between text-sm">
      <div class="text-gray-400">Version: {{ appVersion }}</div>
      <a
        class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
        href="#"
        @click.prevent="handleLogout"
        >Logout</a
      >
    </div>

    <TaskList v-if="showTasks"></TaskList>
    <Notification></Notification>
    <!--    <TaskModal></TaskModal>-->
    <RegisterForm
      v-if="showRegister"
      @registered="handleRegistered"
    ></RegisterForm>
    <LoginForm
      v-if="showLogin"
      @not-registered="handleNotRegistered"
    ></LoginForm>
  </div>
</template>
