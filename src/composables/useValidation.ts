import { ref } from "vue";
import { ValidationError } from "../services/VaidationError.ts";
import { ErrorDetails } from "../types/ApiTypes.ts";

export function useValidation() {
  const errors = ref<ValidationError>(new ValidationError({}));

  const setError = (error: ErrorDetails) => {
    errors.value = new ValidationError(error);
  };

  const clearError = () => {
    errors.value = new ValidationError({});
  };

  return { errors, setError, clearError };
}
