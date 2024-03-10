<script lang="ts" setup>
import ButtonStandard from "./ButtonStandard.vue";
</script>
<template>
  <button-standard
    class="dark:border-gray-600 border-gray-300 dark:text-indigo-400 text-gray-700 dark:bg-gray-900 dark:active:bg-gray-800 active:bg-gray-50 dark:active:text-indigo-200 active:text-gray-800 dark:hover:text-indigo-200 hover:text-gray-500"
      v-bind="$attrs">
    <slot></slot>
  </button-standard>
</template>