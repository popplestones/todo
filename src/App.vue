<script setup lang="ts">
import { getVersion } from '@tauri-apps/api/app';

const appVersion = await getVersion();

import Greet from "./components/Greet.vue";
</script>

<template>
  <div class="container">
    <h1>Welcome to Todo App! {{appVersion }}</h1>

    <Greet />
  </div>
</template>

