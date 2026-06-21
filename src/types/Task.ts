export type Task = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "done";
  due_date: string;
};
