import {
    ApiResponse,
    ErrorResponse,
    LoginSuccessResponse,
    MessageResponse,
    RegisterSuccessResponse
} from "../types/ApiTypes.ts";
import {LoginRequest} from "../types/LoginRequest.ts";
import {RegisterRequest} from "../types/RegisterRequest.ts";
import {AuthState} from "../types/AuthState.ts";
import {reactive} from "vue";
import {invoke} from "@tauri-apps/api/tauri";
import {Body, getClient, HttpOptions, HttpVerb} from "@tauri-apps/api/http";
import {API_BASE_URL} from "../config.ts";

const state = reactive<AuthState>({isLoggedIn: false, token: ""});

const verifyToken = async(): Promise<boolean> => {
    console.log("Calling verifyToken");
    const response = await makeApiCall<void, MessageResponse|ErrorResponse>("verify-token", "POST");
    return response ? response.ok : false;
}

const login = async (formData: LoginRequest): Promise<ApiResponse<LoginSuccessResponse|ErrorResponse>|undefined> => {
    console.log("Calling login");
    const response = await makeApiCall<LoginRequest,LoginSuccessResponse|ErrorResponse>('login', "POST", formData);

    if (response && response.status === 422) return response as ApiResponse<ErrorResponse>;

    if (response && response.ok) {
        const successResponse = response as ApiResponse<LoginSuccessResponse>;
        await invoke("set_token", {value: successResponse.data.token});
        state.token = successResponse.data.token;
        state.isLoggedIn = true;
        return successResponse;
    }
}

const register = async (formData: RegisterRequest): Promise<ApiResponse<RegisterSuccessResponse|ErrorResponse>|undefined> => {
    console.log("Calling register");
    return await makeApiCall<RegisterRequest, RegisterSuccessResponse|ErrorResponse>("register", "POST", formData);
}

const logout = async() => {
    console.log("Calling logout");
    await makeApiCall("logout", "POST")
    state.token = "";
    state.isLoggedIn = false;
}


export async function makeApiCall<TReq, TRes>(endpoint: string, method: HttpVerb = 'GET', data?: TReq): Promise<ApiResponse<TRes>|undefined> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'applications/json'
    };

    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }

    try {
        const client = await getClient();
        const options: HttpOptions = {
            method,
            url,
            headers,
            body: method !== 'GET' && data ? Body.json(data) : undefined,
        };

        const response = await client.request(options);

        return response as ApiResponse<TRes>;
    } catch (error) {
        console.error(`API Error occurred: ${error}`)
    }
}

export default function useAuth() {
    return {
        state,

        makeApiCall,
        verifyToken,
        login,
        logout,
        register,
    }
}