export default function Dashboard() {
  return (
    <section className="bg-brand-purple/10 px-6 py-10">
      <div className="flex place-items-center justify-between">
        <h2 className="text-4xl font-semibold text-brand-purple">
          Welcome Back!
        </h2>
        <button className="border-brand-purple border-2 p-4 text-brand-purple rounded-sm cursor-pointer flex place-items-center gap-4">
          <img className="size-3" src="/filter.svg" />
          Filter
        </button>
      </div>
    </section>
  );
}
