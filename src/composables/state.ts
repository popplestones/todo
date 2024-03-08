import { ref } from 'vue';

const isLoggedIn = ref<boolean>(false);

export function useAuthState(){
    return {
        isLoggedIn
    }
}