<script setup lang="ts">
defineProps({
  title: {
    type: String
  }
})
const emit = defineEmits(['submit']);

const handleSubmit = () => {
  emit('submit')
}

</script>
<template>
  <div>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white" v-text="title" />
      </div>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <slot name="body"></slot>
        <div>
          <slot name="button"></slot>
        </div>
      </form>

      <slot name="footer"></slot>
    </div>
  </div>
</template>