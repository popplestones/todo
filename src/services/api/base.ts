import {makeApiCall} from "../../composables/useAuth.ts";
import {ApiResponse} from "../../types/ApiTypes.ts";

const BaseApi = class {
    async get<TResponse>(route: string): Promise<ApiResponse<TResponse>|undefined> {
        return makeApiCall<void, TResponse>(route, "GET")
    }
    async patch<TRequest, TResponse>(route: string, formData: TRequest): Promise<ApiResponse<TResponse>|undefined> {
        return makeApiCall<TRequest, TResponse>(route, "PATCH", formData);
    }
    async destroy<TResponse>(route: string): Promise<ApiResponse<TResponse>|undefined> {
        return makeApiCall<void, TResponse>(route, "DELETE");
    }
    async post<TRequest, TResponse>(route: string, formData: TRequest): Promise<ApiResponse<TResponse>|undefined> {
        return makeApiCall<TRequest, TResponse>(route, "POST", formData);
    }
}

export const base = new BaseApi();