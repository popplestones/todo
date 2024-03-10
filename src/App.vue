<script setup lang="ts">
import { getVersion } from '@tauri-apps/api/app';
import {computed, onMounted, ref, watchEffect} from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from "./components/RegisterForm.vue";
import {invoke} from "@tauri-apps/api/tauri";
import useAuth from "./composables/useAuth.ts";
import TaskList from "./components/TaskList.vue";

import { notificationStore } from "./stores/notificationStore.ts";
import Notification from "./components/Notification.vue";
const appVersion = ref('');

const hasAccount = ref<boolean>(true);

const handleRegistered = () => {
  hasAccount.value = true;
}

const handleNotRegistered = () => {
  hasAccount.value = false;
}

const handleLogout = async () => {
  await logout();
}

const showLogin = computed(() => {
  return !state.isLoggedIn && hasAccount.value;
});

const showRegister = computed(() => {
  return !state.isLoggedIn && !hasAccount.value;
});

const showTasks = computed(() => {
  return state.isLoggedIn;
})

const { verifyToken, state, logout } = useAuth();

watchEffect(() => {
  console.log('isLoggedIn:', state.isLoggedIn, 'hasAccount:', hasAccount.value);
});

onMounted(async () => {
  appVersion.value = await getVersion();
  state.token = await invoke("get_token");
  state.isLoggedIn = await verifyToken();
});

const notify = () => {
  // notificationStore.showNotification("Test");
  notificationStore.showNotification("Test", "error");
  // notificationStore.showNotification("Test", "info");

}
</script>

<template>
  <div class="bg-gray-900">
    <div class="flex justify-between text-sm">
      <div class="text-gray-400">Version: {{ appVersion }}</div>
      <a href="#" @click.prevent="handleLogout" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">Logout</a>
    </div>

    <TaskList v-if="showTasks"></TaskList>
    <Notification></Notification>
<!--    <TaskModal></TaskModal>-->
    <RegisterForm v-if="showRegister" @registered="handleRegistered"></RegisterForm>
    <LoginForm @not-registered="handleNotRegistered" v-if="showLogin"></LoginForm>
  </div>
</template>

