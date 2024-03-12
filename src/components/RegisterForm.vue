<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";

import useAuth from "../composables/useAuth.ts";
import { useValidation } from "../composables/useValidation.ts";
import { ApiResponse, ErrorResponse } from "../types/ApiTypes.ts";
import { RegisterRequest } from "../types/RegisterRequest.ts";
import useTypeChecks from "../types/TypeChecks.ts";
import InputGroup from "./controls/InputGroup.vue";
import TextInput from "./controls/TextInput.vue";

const formData = reactive<RegisterRequest>({
  email: "",
  invite_code: "",
  name: "",
  password: "",
});

const { errors, setError, clearError } = useValidation();
const { register } = useAuth();
const { isErrorResponse } = useTypeChecks();

const handleRegister = async () => {
  const response = await register(formData);
  if (response) {
    if (isErrorResponse(response.data)) {
      const errorResponse = response as ApiResponse<ErrorResponse>;
      setError(errorResponse.data.errors);
      return;
    }

    emit("registered");
  }
};

const password_confirmation = ref<string>("");

const passwords_match = computed(() => {
  return formData.password === password_confirmation.value;
});

const emit = defineEmits(["registered"]);

watch(formData, () => {
  clearError();
});
</script>

<template>
  <div>
    <div class="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
        >
          Sign up for an account
        </h2>
      </div>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-4" @submit.prevent="handleRegister">
        <input-group id="name" :error="errors.first('name')" label="Name">
          <text-input
            id="name"
            v-model="formData.name"
            :has-error="errors.has('name')"
            name="name"
          />
        </input-group>
        <input-group
          id="email"
          :error="errors.first('email')"
          label="Email address"
        >
          <text-input
            id="email"
            v-model="formData.email"
            :has-error="errors.has('email')"
            autocomplete="email"
            name="email"
            type="email"
          />
        </input-group>
        <input-group
          id="invite"
          :error="errors.first('invite_code')"
          label="Invite Code"
        >
          <text-input
            id="invite"
            v-model="formData.invite_code"
            :has-error="errors.has('invite_code')"
            name="invite"
          />
        </input-group>
        <input-group
          id="password"
          :error="errors.first('password')"
          label="Password"
        >
          <text-input
            id="password"
            v-model="formData.password"
            :has-error="errors.has('password')"
            name="password"
            type="password"
          />
        </input-group>

        <input-group
          id="confirm_password"
          :error="errors.first('password')"
          label="Confirm Password"
        >
          <text-input
            id="confirm_password"
            v-model="password_confirmation"
            :has-error="errors.has('password')"
            name="confirm_password"
            type="password"
          />
        </input-group>
        <span v-if="!passwords_match" class="pt-1 text-sm text-red-600"
          >Passwords do not match</span
        >

        <div>
          <button
            class="flex w-full justify-center rounded-md bg-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-400">
        Already have an account?
        {{ " " }}
        <a
          class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          href="#"
          @click.prevent="handleRegister"
          >Login</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>