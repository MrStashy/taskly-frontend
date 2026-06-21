export default function transformStatus(
  status: "in_progress" | "to_do" | "done",
) {
  const statusMap = {
    in_progress: "In Progress",
    to_do: "To do",
    done: "Complete",
  };

  return statusMap[status];
}
