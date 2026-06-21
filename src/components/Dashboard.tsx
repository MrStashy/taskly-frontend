import TaskList from "./TaskList";

export default function Dashboard() {
  return (
    <section className="bg-brand-purple/5 px-6 py-10 min-h-80">
      <div className="flex place-items-center justify-between">
        <h2 className="text-4xl font-semibold text-brand-purple">
          Welcome Back!
        </h2>
        <button className="justify-center items-center border-brand-purple border-2 p-4 h-10 w-34 text-brand-purple rounded-sm cursor-pointer flex place-items-center gap-4">
          <img className="size-3" src="/filter.svg" />
          Filter
        </button>
      </div>
      <TaskList />
    </section>
  );
}
