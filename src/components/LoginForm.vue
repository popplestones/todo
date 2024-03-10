<script setup lang="ts">
import AuthForm from "./AuthForm.vue";
import {reactive, watch} from "vue";
import {LoginRequest} from "../types/LoginRequest.ts";
import InputGroup from "./controls/InputGroup.vue";
import {useValidation} from "../composables/useValidation.ts";
import TextInput from "./controls/TextInput.vue";
import {ApiResponse, ErrorResponse} from "../types/ApiTypes.ts";
import useAuth from "../composables/useAuth.ts";


const emit = defineEmits(["not-registered", "login"]);

const handleNotRegistered = () => {
  emit('not-registered');
}


const forgotPasswordFeature = false;

const formData = reactive<LoginRequest>({email: "", password: ""});
const {errors, setError, clearError} = useValidation();
const {login, isErrorResponse} = useAuth();

const handleLogin = async () => {
  const response = await login(formData);
  if (response) {
    if (isErrorResponse(response.data)) {
      const errorResponse = response as ApiResponse<ErrorResponse>;
      setError(errorResponse.data.errors);
      return;
    }
  }

}

watch(formData, () => {
  clearError();
})

</script>

<template>
  <auth-form @submit="handleLogin" title="Sign in to your account">
    <template #body>
      <input-group id="email" label="Email Address" :error="errors.first('email')">
        <text-input id="email" name="email" :has-error="errors.has('email')" v-model="formData.email" />
      </input-group>
      <input-group id="password" label="Password" :error="errors.first('password')">
        <template #extra>
          <div v-if="forgotPasswordFeature" class="text-sm">
            <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
        </template>
        <text-input id="password" name="password" type="password" :has-error="errors.has('password')" v-model="formData.password" />
      </input-group>
    </template>
    <template #button>
      <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
    </template>
    <template #footer>
      <p class="mt-10 text-center text-sm text-gray-400">
        Not a member, but have a voucher code?
        {{ ' ' }}
        <a href="#" @click.prevent="handleNotRegistered" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">Register</a>
      </p>
    </template>
  </auth-form>
</template>