<script setup lang="ts">
import { getVersion } from '@tauri-apps/api/app';
import {onMounted, ref} from 'vue';
import LoginForm from './components/LoginForm.vue';
import { useAuthState } from './composables/state.ts'
const appVersion = ref('');

const fetchAppVersion = async() => {
    appVersion.value = await getVersion();
}
const { isLoggedIn } = useAuthState();


onMounted(fetchAppVersion);

</script>

<template>
  <div>
      <div>Version: {{ appVersion }}</div>
    <LoginForm v-if="!isLoggedIn"></LoginForm>
  </div>
</template>

