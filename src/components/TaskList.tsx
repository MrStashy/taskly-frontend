import { useEffect, useState, useTransition } from "react";
import TaskRepository from "../utils/TaskRepository";
import getUkDate from "../utils/getUkDate";
import LoadingTasks from "./LoadingTasks";
import transformStatus from "../utils/transformStatus";
import StatusIcon from "./StatusIcon";
import type { Task } from "../types/Task";

export default function TaskList() {
  const [loading, setLoading] = useTransition();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchTasks() {
      const data = await TaskRepository.GetAllTasks();
      if (!ignore) {
        setTasks(data ?? []);
      }
    }

    setLoading(() => fetchTasks());

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <LoadingTasks />;
  }
  if (!tasks.length) {
    return <p>No tasks found</p>;
  }

  console.log(tasks);
  return (
    <>
      <div className="grid-cols-[.5fr_2fr_3fr_3fr_2fr_2fr_1fr] grid px-4 text-xs text-brand-purple font-semibold mt-10 mb-2">
        <p>ID</p>
        <p>TITLE</p>
        <p>DESCRIPTION</p>
        <p>STATUS</p>
        <p>DUE DATE</p>
        <p>DATE CREATED</p>
        <p></p>
      </div>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <ul className="grid-cols-[.5fr_2fr_3fr_3fr_2fr_2fr_1fr] grid  bg-white h-18 p-4 rounded-md hover:border-2 border-brand-purple">
            <li className="flex place-items-center text-brand-purple font-semibold ">
              {task.id}
            </li>
            <li className="flex place-items-center">{task.title}</li>
            <li className="flex place-items-center text-xs">
              {task.description.slice(0, 40)}...
            </li>
            <li className="flex place-items-center">
              <StatusIcon status={transformStatus(task.status)} />
            </li>
            <li className="flex place-items-center text-xs">
              {getUkDate(task.due_date)}
            </li>
            <li className="flex place-items-center text-xs">
              {getUkDate(task.created_at)}
            </li>
            <div className="flex place-items-center">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </ul>
        ))}
      </ul>
    </>
  );
}
