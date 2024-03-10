<script lang="ts" setup>
import Modal from './Modal.vue';

defineProps({
  show: Boolean,
  id: String,
  maxWidth: String
});
const emit = defineEmits(['close']);

const handleClose = (e: any) => {
  emit('close', e);
};


</script>
<template>
  <modal :id="id" :max-width="maxWidth" :show="show" @close="handleClose">
    <div class="px-6 py-4">
      <div class="text-lg">
        <slot name="title"></slot>
      </div>
      <div class="mt-4">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="px-6 py-4 dark:bg-gray-800 bg-gray-100 text-right">
      <slot name="footer"></slot>
    </div>
  </modal>
</template>