<script setup lang="ts">
  defineProps({
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
    },
    hasError: {
      type: Boolean,
      default: false
    }
  }
  );

  defineEmits(['update:modelValue']);

</script>
<template>
  <input :id="id"
         :name="name"
         :type="type"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         class="block w-full rounded-md border-0 dark:bg-gray-800 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" :class="{'border border-red-400 text-red-400': hasError}"/>
</template>