import { useEffect, useState, useTransition } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TaskRepository from "./utils/TaskRepository";
import type { Task } from "./types/Task";

function App() {
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

  if (!tasks.length) {
    return <p>No tasks found</p>;
  }
  return (
    <main className="p-4">
      <Header />
      <Dashboard loading={loading} setTasks={setTasks} tasks={tasks} />
    </main>
  );
}

export default App;
