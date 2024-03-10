<script lang="ts" setup>
import ButtonStandard from "./ButtonStandard.vue";
</script>

<template>
  <button-standard
      class="text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 border-indigo-600">
    <slot></slot>
  </button-standard>
</template>