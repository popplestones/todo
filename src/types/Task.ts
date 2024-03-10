export interface Task {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export type TaskForCreate = Omit<Task, 'id'|'completed'>;

export type TaskForUpdate = Omit<Task, 'id'>;