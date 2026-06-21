import { useEffect, useState, useTransition } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TaskRepository from "./utils/TaskRepository";
import type { Task } from "./types/Task";

function App() {
  const [loading, setLoading] = useTransition();
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks(ignore: boolean) {
    const data = await TaskRepository.GetAllTasks();
    if (!ignore) {
      setTasks(data ?? []);
    }
  }

  useEffect(() => {
    let ignore = false;

    setLoading(() => fetchTasks(ignore));

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="p-4">
      <Header fetchTasks={fetchTasks} />
      <Dashboard
        fetchTasks={fetchTasks}
        loading={loading}
        setTasks={setTasks}
        tasks={tasks}
      />
    </main>
  );
}

export default App;
