import { reactive } from 'vue';

export type NotificationType = "success" | "error" | "info";

export interface NotificationStore {
    show: boolean,
    message: string,
    type: NotificationType,
    showNotification: (message: string, type?: NotificationType, timeout?: number) => void
}

export const notificationStore = reactive<NotificationStore>({
    show: false,
    message: '',
    type: "success",

    showNotification(message, type = 'success', timeout = 3000) {
        this.message = message;
        this.type = type;
        this.show = true;

        setTimeout(() => {
            this.show = false;
        }, timeout);
    }
});
