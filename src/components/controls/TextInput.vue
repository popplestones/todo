<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
<template>
  <input
    :id="id"
    :class="{ 'border border-red-400 text-red-400': hasError }"
    :name="name"
    :type="type"
    :value="modelValue"
    class="block w-full rounded-md border-0 dark:bg-gray-800 bg-white/5 text-white shadow-sm ring-1 pt-2.5 pb-1.5 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
    "
  />
</template>
