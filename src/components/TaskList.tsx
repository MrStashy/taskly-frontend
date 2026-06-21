import { useState } from "react";
import getUkDate from "../utils/getUkDate";
import transformStatus from "../utils/transformStatus";
import StatusIcon from "./StatusIcon";
import LoadingTasks from "./LoadingTasks";
import type { Task } from "../types/Task";
import TaskRepository from "../utils/TaskRepository";

type TaskList = {
  fetchTasks: (ignore: boolean) => Promise<void>;
  loading: boolean;
  tasks: Task[];
};

export default function TaskList({ fetchTasks, loading, tasks }: TaskList) {
  const [showStatusUpdateMenu, setShowStatusUpdateMenu] = useState<
    number | null
  >(null);
  async function handleDelete(id: string) {
    await TaskRepository.DeleteTaskById(id);
    fetchTasks(false);
  }

  async function handleUpdate(id: number, status: string) {
    await TaskRepository.UpdateTaskProgressById(id.toString(), status);
    fetchTasks(false);
  }

  if (loading) {
    return <LoadingTasks />;
  }

  if (!tasks.length) {
    return <p className="mt-10">No tasks found!</p>;
  }

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
        {tasks.map((task, index) => (
          <ul
            key={index}
            className="group grid-cols-[.5fr_2fr_3fr_3fr_2fr_2fr_1fr] grid  bg-white h-18 p-4 rounded-md hover:border-2 border-brand-purple"
          >
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
            <div className="flex place-items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => {
                    if (showStatusUpdateMenu === index) {
                      setShowStatusUpdateMenu(null);
                      return;
                    }
                    setShowStatusUpdateMenu(index);
                  }}
                  className="text-brand-purple group-hover:bg-brand-purple/10 p-2 cursor-pointer rounded-md"
                >
                  {showStatusUpdateMenu === index && (
                    <div className="absolute top-10 w-30 text-black z-99">
                      <ul className="flex bg-white flex-col divide-y  border-brand-purple border rounded-sm cursor-pointer">
                        <li
                          className="p-2 hover:bg-gray-200"
                          id="to_do"
                          onClick={(e) =>
                            handleUpdate(task.id, e.currentTarget.id)
                          }
                        >
                          To do
                        </li>
                        <li
                          id="in_progress"
                          className="p-2 hover:bg-gray-200"
                          onClick={(e) =>
                            handleUpdate(task.id, e.currentTarget.id)
                          }
                        >
                          In Progress
                        </li>
                        <li
                          id="done"
                          className="p-2 hover:bg-gray-200"
                          onClick={(e) =>
                            handleUpdate(task.id, e.currentTarget.id)
                          }
                        >
                          Complete
                        </li>
                      </ul>
                    </div>
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-6 stroke-current"
                  >
                    <path
                      d="M13 21H21"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.3096 5.30981L18.7273 8.72755"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      opacity="0.1"
                      d="M18.556 8.90942L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L15.0647 5.35974C15.0742 5.4062 15.0969 5.45049 15.1329 5.48653L18.5506 8.90426C18.5524 8.90601 18.5542 8.90773 18.556 8.90942Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => handleDelete(task.id.toString())}
                className="text-red-500 group-hover:bg-red-500/10 p-2 cursor-pointer rounded-md"
              >
                <svg
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  className="size-6 stroke-current"
                >
                  <path
                    d="M3 21.32L21 3.32001"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 3.32001L21 21.32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </ul>
        ))}
      </ul>
    </>
  );
}
