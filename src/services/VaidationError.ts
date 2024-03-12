import { ErrorDetails } from "../types/ApiTypes.ts";

export class ValidationError {
  private readonly errors: ErrorDetails;

  constructor(errors: ErrorDetails) {
    this.errors = errors;
  }

  has(key: string): boolean {
    return key in this.errors;
  }

  get(key: string): string[] {
    return this.errors[key] || [];
  }

  all(): ErrorDetails {
    return this.errors;
  }

  first(key: string): string {
    const values = this.errors[key];

    return values && values.length > 0 ? values[0] : "";
  }

  any(): boolean {
    return Object.keys(this.errors).length > 0;
  }
}
