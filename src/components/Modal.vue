<script lang="ts" setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  show: Boolean,
  id: String,
  maxWidth: String,
});

const computedMaxWidth = computed(() => {
  switch (props.maxWidth) {
    case "sm":
      return "sm:max-w-sm";
    case "md":
      return "sm:max-w-md";
    case "lg":
      return "sm:max-w-lg";
    case "xl":
      return "sm:max-w-xl";
    case "2xl":
      return "sm:max-w-2xl";
    case "3xl":
      return "sm:max-w-3xl";
    case "4xl":
      return "sm:max-w-4xl";
    case "5xl":
      return "sm:max-w-5xl";
    case "6xl":
      return "sm:max-w-6xl";
    default:
      return "sm:max-w-2xl";
  }
});

const emit = defineEmits(["close"]);

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      emit("close", e);
    }
  });
});
const handleClose = () => {
  emit("close");
};
</script>
<template>
  <div
    v-show="show"
    :id="id"
    class="fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center"
    v-on:keydown.esc="handleClose"
  >
    <!-- Overlay //-->
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="show"
        class="fixed inset-0 transform transition-all"
        @click="handleClose"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>
    <!-- Overlay //-->

    <!-- Dialog //-->
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-show="show"
        :class="computedMaxWidth"
        class="bg-white dark:bg-slate-700 rounded-lg shadow-xl transform transition-all sm:w-full"
      >
        <slot></slot>
      </div>
    </transition>
    <!-- Dialog //-->
  </div>
</template>
