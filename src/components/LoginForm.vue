<script lang="ts" setup>
import { reactive, watch } from "vue";
import useAuth from "../composables/useAuth.ts";
import { useValidation } from "../composables/useValidation.ts";
import { ApiResponse, ErrorResponse } from "../types/ApiTypes.ts";
import { LoginRequest } from "../types/LoginRequest.ts";
import useTypeChecks from "../types/TypeChecks.ts";
import AuthForm from "./AuthForm.vue";
import InputGroup from "./controls/InputGroup.vue";
import TextInput from "./controls/TextInput.vue";

const emit = defineEmits(["not-registered", "login"]);

const handleNotRegistered = () => {
  emit("not-registered");
};

const forgotPasswordFeature = false;

const formData = reactive<LoginRequest>({ email: "", password: "" });
const { errors, setError, clearError } = useValidation();
const { login } = useAuth();
const { isErrorResponse } = useTypeChecks();

const handleLogin = async () => {
  const response = await login(formData);
  if (response) {
    if (isErrorResponse(response.data)) {
      const errorResponse = response as ApiResponse<ErrorResponse>;
      setError(errorResponse.data.errors);
      return;
    }
  }
};

watch(formData, () => {
  clearError();
});
</script>

<template>
  <auth-form title="Sign in to your account" @submit="handleLogin">
    <template #body>
      <input-group
        id="email"
        :error="errors.first('email')"
        label="Email Address"
      >
        <text-input
          id="email"
          v-model="formData.email"
          :has-error="errors.has('email')"
          name="email"
        />
      </input-group>
      <input-group
        id="password"
        :error="errors.first('password')"
        label="Password"
      >
        <template #extra>
          <div v-if="forgotPasswordFeature" class="text-sm">
            <a
              class="font-semibold text-indigo-400 hover:text-indigo-300"
              href="#"
              >Forgot password?</a
            >
          </div>
        </template>
        <text-input
          id="password"
          v-model="formData.password"
          :has-error="errors.has('password')"
          name="password"
          type="password"
        />
      </input-group>
    </template>
    <template #button>
      <button
        class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        type="submit"
      >
        Sign in
      </button>
    </template>
    <template #footer>
      <p class="mt-10 text-center text-sm text-gray-400">
        Not a member, but have a voucher code?
        {{ " " }}
        <a
          class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          href="#"
          @click.prevent="handleNotRegistered"
          >Register</a
        >
      </p>
    </template>
  </auth-form>
</template>