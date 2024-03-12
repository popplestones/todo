import { ErrorResponse, TaskIndexResponse } from "../../types/ApiTypes.ts";
import { PaginationOptions } from "../../types/PaginationOptions.ts";
import { TaskForCreate, TaskForUpdate } from "../../types/Task.ts";
import { route } from "../route.ts";
import { base } from "./base.ts";

const index = async (options: PaginationOptions) => {
  return base.get<TaskIndexResponse | ErrorResponse>(
    route("tasks", undefined, options),
  );
};

const get = async (id: number) => {
  return base.get(route("tasks", id));
};

const update = async (id: number, task: TaskForUpdate) => {
  return base.patch(route("tasks", id), { task });
};

const store = async (task: TaskForCreate) => {
  return base.post(route("tasks"), { ...task });
};
const destroy = async (id: number) => {
  return base.destroy(route("tasks", id));
};

export default {
  index,
  get,
  update,
  destroy,
  store,
};
