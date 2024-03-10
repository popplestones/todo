<script setup lang="ts">

import {onMounted} from "vue";
import useTasks from "../composables/useTasks.ts";
import usePagination from "../composables/usePagination.ts";
const {options} = usePagination("tasks");
const {tasks, loading} = useTasks(options)
onMounted(() => {

})

</script>

<template>
  <div v-if="!loading">
      <div class="bg-gray-900 py-4">
        <h2 class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Tasks</h2>
        <table class="mt-6 w-full whitespace-nowrap text-left">
          <colgroup>
            <col class="w-full sm:w-4/12" />
            <col class="lg:w-4/12" />
            <col class="lg:w-2/12" />
            <col class="lg:w-1/12" />
          </colgroup>
          <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Name</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Description</th>
            <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Completed</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Actions</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
          <tr v-for="(task, key) in tasks" :key="key">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <div class="truncate text-sm font-medium leading-6 text-white">{{ task.id }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-gray-400">{{ task.name }}</div>
                <div class="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10"></div>
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">{{ task.description }}</td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<style scoped>

</style>