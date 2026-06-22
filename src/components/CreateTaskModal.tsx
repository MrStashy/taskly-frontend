import { type RefObject, useState } from "react";
import TaskRepository from "../utils/TaskRepository";

type CreateTaskModal = {
  fetchTasks: (ignore: boolean) => Promise<void>;
  ref: RefObject<HTMLDialogElement | null>;
};

export default function CreateTaskModal({ fetchTasks, ref }: CreateTaskModal) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "to_do",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrorMessage("");
  }

  async function handleSubmit() {
    const result = await TaskRepository.CreateTask(formData);

    if (result === "error") {
      setErrorMessage("Something went wrong. Check your inputs and try again.");
      return;
    }

    setErrorMessage("");
    fetchTasks(false);
    ref.current?.close();
  }

  return (
    <dialog
      className="w-90 h-fit p-4 rounded-lg shadow-lg m-auto backdrop:bg-black/50 border-brand-purple border-2"
      ref={ref}
    >
      <header className="flex justify-between items-center">
        <h2 className="text-brand-purple">Create Task</h2>
        <button
          className="text-red-500 p-2 cursor-pointer hover:bg-red-100 rounded-md"
          onClick={() => ref.current?.close()}
        >
          <svg
            viewBox="-0.5 0 25 25"
            fill="none"
            className="size-4 stroke-current"
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
      </header>
      <form className="my-4 flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <label className="text-brand-purple text-xs" htmlFor="title">
            Title
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="title"
            id="title"
            type="text"
            className="border border-gray-200 rounded-md p-1 text-xs"
            placeholder="Enter task title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-brand-purple text-xs" htmlFor="title">
            Description
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="description"
            id="description"
            type="text"
            className="border border-gray-200 rounded-md p-1 text-xs"
            placeholder="Enter task description"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-brand-purple text-xs" htmlFor="title">
            Due date
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="due_date"
            id="due_date"
            type="text"
            className="border border-gray-200 rounded-md p-1 text-xs"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="flex flex-col place-items-center mt-4">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="justify-center items-center bg-brand-purple p-4 h-10 w-34 text-white rounded-sm cursor-pointer flex place-items-center gap-4"
          >
            Submit
          </button>
          {errorMessage && (
            <p className="text-red-500 text-xs text-center mt-4">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </dialog>
  );
}
