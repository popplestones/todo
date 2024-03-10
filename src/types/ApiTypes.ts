import {User} from "./UserTypes.ts";
import {Task} from "./Task.ts";

export type ErrorDetails = Record<string, string[]>;

export interface ApiResponse<T> {
    data: T;
    headers: Record<string, string>;
    ok: boolean;
    rawHeaders: Record<string, string[]>;
    status: number;
    url: string;
}

export interface ErrorResponse {
    message: string;
    errors: ErrorDetails
}

export interface LoginSuccessResponse {
    user: User;
    token: string;
    message: string;
}

export interface RegisterSuccessResponse {
    user: User;
    message: string
}

export interface MessageResponse {
    message: string
}

export interface TaskIndexResponse {
    data: Task[];
    links: Links
    meta: Record<string,any>
}

export interface Links {
    first: string|null;
    last: string|null;
    prev: string|null;
    next: string|null;
}