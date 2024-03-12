<script lang="ts" setup>
import { ref } from "vue";

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

const inputElement = ref<HTMLInputElement | null>(null);

const focus = () => {
  inputElement.value?.focus();
};

defineExpose({ focus });

defineEmits(["update:modelValue"]);
</script>
<template>
  <input
    :id="id"
    ref="inputElement"
    :class="{ 'border border-red-400 text-red-400': hasError }"
    :name="name"
    :type="type"
    :value="modelValue"
    class="block w-full rounded-md border-0 dark:bg-gray-800 bg-white/5 text-white shadow-sm ring-1 pt-2.5 pb-1.5 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
    v-bind="$attrs"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
    "
  />
</template>
