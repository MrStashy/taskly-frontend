import { useRef, useState } from "react";
import TaskList from "./TaskList";
import TaskRepository from "../utils/TaskRepository";
import { useClickOutside } from "../utils/useClickOutside";
import type { Task } from "../types/Task";

type Dashboard = {
  fetchTasks: (ignore: boolean) => Promise<void>;
  loading: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
};

export default function Dashboard({
  fetchTasks,
  loading,
  setTasks,
  tasks,
}: Dashboard) {
  const [showSelection, setShowSelection] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setShowSelection(false));

  async function handleFilter(e: React.MouseEvent<HTMLElement>) {
    setShowSelection(false);
    const element = e.currentTarget;

    const response = await TaskRepository.GetTasksByStatus(element.id);
    setTasks(response);
  }

  return (
    <section className="bg-brand-purple/5 px-6 py-10 min-h-80">
      <div className="flex place-items-center justify-between">
        <h2 className="text-4xl font-semibold text-brand-purple">
          Welcome Back!
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowSelection(!showSelection)}
            className="justify-center items-center border-brand-purple border-2 p-4 h-10 w-34 text-brand-purple rounded-sm cursor-pointer flex place-items-center gap-4"
          >
            <img className="size-3" src="/filter.svg" />
            Filter
          </button>
          {showSelection && (
            <div className="absolute z-99" ref={dropdownRef}>
              <ul className="flex bg-white flex-col divide-y  border-brand-purple border rounded-sm cursor-pointer">
                <li
                  className="p-2 hover:bg-gray-200"
                  id="to_do"
                  onClick={(e) => handleFilter(e)}
                >
                  To do
                </li>
                <li
                  id="in_progress"
                  className="p-2 hover:bg-gray-200"
                  onClick={(e) => handleFilter(e)}
                >
                  In Progress
                </li>
                <li
                  id="done"
                  className="p-2 hover:bg-gray-200"
                  onClick={(e) => handleFilter(e)}
                >
                  Complete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <TaskList fetchTasks={fetchTasks} loading={loading} tasks={tasks} />
    </section>
  );
}
