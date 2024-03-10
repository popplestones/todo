<script lang="ts" setup>
defineProps({
  disabled: Boolean
});

</script>
<template>
  <button
      :class="{'opacity-75 cursor-not-allowed' : disabled}"
      :disabled="disabled"
      class="py-2 px-4 border rounded-md text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 shadow-sm focus:shadow-outline-blue transition duration-150 ease-in-out"
      type="button"
      v-bind="$attrs">
    <slot></slot>
  </button>
</template>