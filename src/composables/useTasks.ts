import {Ref, ref, watch} from "vue";
import {Task} from "../types/Task.ts";
import {PaginationOptions} from "../types/PaginationOptions.ts";
import taskApi from "../services/api/taskApi.ts";
import useTypeChecks from "../types/TypeChecks.ts";

const {isErrorResponse} = useTypeChecks();

export default function useTasks(options: Ref<PaginationOptions>) {
    ;console.log("Running useTasks Composable")
    const tasks = ref<Task[]>([]);
    const meta = ref<Record<string,any>>({});
    const error = ref<Record<string,any>>({});
    const loading = ref<boolean>(true);

    const fetchTasks = async() => {
        console.log("Running FetchTasks")
        loading.value = true;
        const response = await taskApi.index(options.value);
        console.log(response)
        if (response) {
            console.log("Got a response")
            if (response.ok && !isErrorResponse(response.data)) {
                console.log("It's valid")
                console.log("response", response.data.data)
                tasks.value = response.data.data;
                meta.value = response.data.meta;
            } else if (isErrorResponse(response.data)) {
                error.value = response.data.errors
            }
        }
        loading.value = false;
    };

    const refresh = async () => {
        await fetchTasks();
    };

    watch(options, async () => {
       await fetchTasks();
    }, {immediate:true, deep: true});


    return { tasks, loading, meta, error, refresh}
}