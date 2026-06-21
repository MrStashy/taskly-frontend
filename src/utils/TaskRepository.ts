import type { Task } from "../types/Task";

const TaskRepository = {
  API: async <T>(
    method: "DELETE" | "GET" | "PATCH" | "POST",
    urlSuffix: string,
    body?: string,
  ): Promise<T | undefined> => {
    const baseUrl = import.meta.env.VITE_TASK_SERVICE_URL!;
    let response: Response;

    try {
      response = await fetch(`${baseUrl}${urlSuffix}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: body,
      });

      if (!response.ok) {
        console.log(await response.json());

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch {
      return;
    }
  },
  GetAllTasks: async () => {
    const urlSuffix = "tasks/";
    const response = await TaskRepository.API<Task[]>("GET", urlSuffix);

    if (!response) {
      return [];
    }

    return response;
  },
  CreateTask: async (body: {
    title: string;
    description: string;
    due_date: string;
    status: string;
  }) => {
    console.log("body", body);
    const urlSuffix = "tasks/";
    const response = await TaskRepository.API<Task[]>(
      "POST",
      urlSuffix,
      JSON.stringify(body),
    );

    if (!response) {
      return "error";
    }

    return response;
  },
  GetTasksByStatus: async (status: string) => {
    const urlSuffix = `tasks?status=${status}`;

    const response = await TaskRepository.API<Task[]>("GET", urlSuffix);

    if (!response) {
      return [];
    }

    return response;
  },
  DeleteTaskById: async (id: string) => {
    const urlSuffix = `tasks/${id}`;
    const response = await TaskRepository.API<Task[]>("DELETE", urlSuffix);
    console.log(response);
    return response;
  },
  UpdateTaskProgressById: async (id: string, status: string) => {
    const urlSuffix = `tasks/${id}`;
    const body = JSON.stringify({ status: status });

    const response = await TaskRepository.API<Task[]>("PATCH", urlSuffix, body);
    console.log(response);
    return response;
  },
};

export default TaskRepository;
