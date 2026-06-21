import { useRef } from "react";
import CreateTaskModal from "./CreateTaskModal";

type Header = {
  fetchTasks: (ignore: boolean) => Promise<void>;
};

export default function Header({ fetchTasks }: Header) {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <header className="h-24 px-6">
      <section className="flex place-items-center justify-between">
        <div className="flex place-items-center">
          <img className="h-20" src="/Taskly_logo.png" />
          <h1 className="text-4xl font-bold">TASKLY</h1>
        </div>
        <button
          onClick={() => modalRef.current?.showModal()}
          className="bg-brand-purple p-4 text-white h-10 w-34 rounded-sm cursor-pointer hover:opacity-80 transition-all ease flex items-center"
        >
          + Create Task
        </button>
      </section>
      <CreateTaskModal fetchTasks={fetchTasks} ref={modalRef} />
    </header>
  );
}
