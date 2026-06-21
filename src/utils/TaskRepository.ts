import type { Task } from "../types/Task";

const TaskRepository = {
  API: async <T>(urlSuffix: string): Promise<T | undefined> => {
    const baseUrl = import.meta.env.VITE_TASK_SERVICE_URL!;

    console.log(baseUrl);

    let response: Response;

    try {
      response = await fetch(`${baseUrl}${urlSuffix}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch {
      return;
    }
  },
  GetAllTasks: async () => {
    const urlSuffix = "tasks/";
    const response = await TaskRepository.API<Task[]>(urlSuffix);

    if (!response) {
      return [];
    }

    return response;
  },
};

export default TaskRepository;
