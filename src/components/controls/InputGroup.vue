<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  }

})
</script>
<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="id" class="block text-sm font-medium leading-6 text-white" v-text="label" />
      <slot name="extra"></slot>
    </div>
    <div class="mt-2">
      <slot></slot>
      <p v-if="error" class="pt-1 text-red-500 text-sm" v-text="error" />
    </div>
  </div>
</template>