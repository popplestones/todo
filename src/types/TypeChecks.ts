import {ErrorResponse} from "./ApiTypes.ts";

function isErrorResponse(response: unknown | ErrorResponse): response is ErrorResponse {
    return (response as ErrorResponse).errors !== undefined;
}

export default function useTypeChecks() {
    return {
        isErrorResponse,
    };
}