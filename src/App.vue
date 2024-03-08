<script setup lang="ts">
import { getVersion } from '@tauri-apps/api/app';
import {onMounted, ref} from 'vue';

const appVersion = ref('');

const fetchAppVersion = async() => {
    appVersion.value = await getVersion();
}

onMounted(fetchAppVersion);

import Greet from "./components/Greet.vue";
</script>

<template>
  <div class="container">
    <h1>Welcome to Todo App! {{ appVersion }}</h1>
    Testing
    <Greet />
  </div>
</template>

