<script lang="ts" setup>
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref, watch } from "vue";
import usePagination from "../composables/usePagination.ts";
import useTasks from "../composables/useTasks.ts";
import { useValidation } from "../composables/useValidation.ts";
import taskApi from "../services/api/taskApi.ts";
import { ApiResponse, ErrorResponse } from "../types/ApiTypes.ts";
import { Task, TaskForCreate } from "../types/Task.ts";
import useTypeChecks from "../types/TypeChecks.ts";
import TextInput from "./controls/TextInput.vue";

const { options } = usePagination("tasks");
const { tasks, refresh } = useTasks(options);
onMounted(() => {});

const editing = ref<boolean>(false);
const editingTask = ref<Task | null>(null);

const editTask = (task: Task) => {
  editing.value = true;
  editingTask.value = task;
};

const deleteTask = async (task: Task) => {
  await taskApi.destroy(task.id);
  await refresh();
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

const createInput = ref<InstanceType<typeof TextInput> | null>(null);

const isEditing = (id: number) => {
  return !!(editingTask.value && editingTask.value.id === id);
};
const { isErrorResponse } = useTypeChecks();
const { setError, errors: newTaskErrors, clearError } = useValidation();
const newTaskName = ref<string>("");
const createTask = async () => {
  const taskForCreate: TaskForCreate = {
    name: newTaskName.value,
  };

  const response = await taskApi.store(taskForCreate);

  if (response) {
    if (isErrorResponse(response.data)) {
      const errorResponse = response as ApiResponse<ErrorResponse>;
      setError(errorResponse.data.errors);
      return;
    }
  }
  newTaskName.value = "";
  await refresh();
  createInput.value?.focus();
};

watch(newTaskName, () => {
  clearError();
});
</script>

<template>
  <div class="flex flex-col p-1 flex-1 overflow-hidden">
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
    <div class="flex w-full py-2 text-sm border-b border-gray-700 pr-7 pl-2">
      <span class="p-2 w-14">&nbsp;</span>
      <span class="p-2 w-24">&nbsp;</span>
      <div class="grow">
        <form @submit.prevent="createTask">
          <text-input
            id="taskName"
            ref="createInput"
            v-model="newTaskName"
            name="taskName"
          />
          <p
            class="text-sm text-red-500 italic"
            v-text="newTaskErrors.first('name')"
          ></p>
        </form>
      </div>
      <span class="p-2 w-24">&nbsp;</span>
    </div>

    <div class="flex-grow flex flex-col overflow-y-auto pr-3 pl-2">
      <div
        v-for="task in tasks"
        class="flex w-full py-2 text-sm border-b border-gray-700"
      >
        <span
          class="py-2 px-2 font-semibold border w-14 text-center truncate"
          v-text="task.id"
        />
        <span class="py-2 px-2 border w-24 text-center">{{
          task.completed ? "X" : "-"
        }}</span>
        <span class="py-2 px-2 border grow" v-text="task.name" />
        <span
          class="py-2 px-2 border w-24 truncate text-center flex items-center space-x-2"
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

            <button title="Delete" @click="deleteTask(task)">
              <TrashIcon class="w-5 h-5 text-red-400" />
            </button>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
