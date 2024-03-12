<script lang="ts" setup>
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import usePagination from "../composables/usePagination.ts";
import useTasks from "../composables/useTasks.ts";
import { Task } from "../types/Task.ts";

const { options } = usePagination("tasks");
const { tasks, loading } = useTasks(options);
onMounted(() => {});

const editing = ref<boolean>(false);
const editingTask = ref<Task | null>(null);

const editTask = (task: Task) => {
  editing.value = true;
  editingTask.value = task;
};

const cancelEdit = () => {
  editing.value = false;
  editingTask.value = null;
};

const finishEdit = (_task: Task) => {
  // Save the task here...
  editingTask.value = null;
  editing.value = false;
};

const isEditing = (id: number) => {
  return !!(editingTask.value && editingTask.value.id === id);
};
</script>

<template>
  <div v-if="!loading" class="flex flex-col p-1 flex-1 overflow-hidden">
    <div class="bg-gray-900 py-4 flex flex-col">
      <h2
        class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8"
      >
        Tasks
      </h2>
      <div
        class="flex w-full py-2 text-sm font-semibold border-b border-gray-700 pl-2 pr-7"
      >
        <span class="p-2 border w-14 text-center">ID</span>
        <span class="p-2 border w-24 text-center truncate">Completed</span>
        <span class="p-2 border grow">Name</span>
        <span class="p-2 border w-24 truncate text-center">F</span>
      </div>
    </div>
    <div class="flex-grow flex flex-col overflow-y-auto pr-3 pl-2">
      <div
        v-for="task in tasks"
        class="flex w-full py-2 text-sm border-b border-gray-700"
      >
        <span
          class="py-3 px-2 font-semibold border w-14 text-center truncate"
          v-text="task.id"
        />
        <span class="py-3 px-2 border w-24 text-center">{{
          task.completed ? "X" : "-"
        }}</span>
        <span class="py-3 px-2 border grow" v-text="task.name" />
        <span
          class="py-3 px-2 border w-24 truncate text-center flex items-center space-x-2"
        >
          <span v-if="isEditing(task.id)">
            <button title="Accept" @click="finishEdit(task)">
              <CheckCircleIcon class="w-5 h-5 text-green-400" />
            </button>
            <button title="Cancel" @click="cancelEdit">
              <XCircleIcon class="w-5 h-5 text-red-400" />
            </button>
          </span>
          <span v-else>
            <button title="Edit" @click="editTask(task)">
              <PencilSquareIcon class="w-5 h-5 text-amber-300" />
            </button>

            <button title="Delete">
              <TrashIcon class="w-5 h-5 text-red-400" />
            </button>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom class for padding adjustment */
.scrollbar-padding::-webkit-scrollbar {
  width: 16px; /* Adjust based on your design/needs */
}

.scrollbar-padding {
  padding-right: 16px; /* Extra padding to compensate for the scrollbar width */
  overflow-y: scroll; /* Show scrollbar when necessary */
}

/* Adjust the padding dynamically if the scrollbar is not present */
@media (hover: hover) {
  .scrollbar-padding:hover {
    padding-right: 0px;
  }
}
</style>
