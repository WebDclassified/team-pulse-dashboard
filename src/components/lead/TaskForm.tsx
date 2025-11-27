import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { assignTask } from "../../redux/slices/membersSlice";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const members = useAppSelector(state => state.members.list);

  const [memberId, setMemberId] = useState(members[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!memberId || !title || !dueDate) return;

    dispatch(assignTask({ memberId, title, dueDate }));
    setTitle("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-xl shadow-sm space-y-3"
    >
      <h2 className="font-semibold text-lg mb-2">Assign Task</h2>

      <div className="space-y-1 text-sm">
        <label className="block">Member</label>
        <select
          value={memberId}
          onChange={e => setMemberId(e.target.value)}
          className="w-full border rounded-md px-2 py-1 text-sm"
        >
          {members.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1 text-sm">
        <label className="block">Task Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded-md px-2 py-1 text-sm"
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="w-full border rounded-md px-2 py-1 text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full px-3 py-2 bg-indigo-600 text-white rounded-md text-sm"
      >
        Assign
      </button>
    </form>
  );
};

export default TaskForm;
