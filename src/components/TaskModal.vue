<script setup lang="ts">
import DialogModal from "./DialogModal.vue";
import ButtonPrimary from "./controls/ButtonPrimary.vue";
import ButtonSecondary from "./controls/ButtonSecondary.vue";
import InputGroup from "./controls/InputGroup.vue";
import TextInput from "./controls/TextInput.vue";
</script>
<template>
  <dialog-modal :show="true">
    <template #title>Create Task</template>
    <template #content>
      <div class="flex flex-col space-y-2">
      <input-group id="name" label="Name">
        <text-input id="name" name="Name"></text-input>
      </input-group>
      <input-group id="description" label="Description">
        <text-input id="description" name="Name"></text-input>
      </input-group>

      <input-group id="name" label="Name">
        <text-input id="name" name="Name"></text-input>
      </input-group>

      <input-group id="name" label="Name">
        <text-input id="name" name="Name"></text-input>
      </input-group>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end space-x-2">
        <button-secondary>Cancel</button-secondary>
        <button-primary>Ok</button-primary>
      </div>
    </template>
  </dialog-modal>
</template>