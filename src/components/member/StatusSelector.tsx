import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateStatus } from "../../redux/slices/membersSlice";
import type { Status } from "../../types";

const statuses: { label: string; value: Status }[] = [
  { label: "Working", value: "working" },
  { label: "Break", value: "break" },
  { label: "Meeting", value: "meeting" },
  { label: "Offline", value: "offline" },
];

const StatusSelector = () => {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector(state => state.role);
  const member = useAppSelector(state =>
    state.members.list.find(m => m.id === currentUserId)
  );

  if (!member) return null;

  const handleClick = (status: Status) => {
    dispatch(updateStatus({ memberId: member.id, status }));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h2 className="font-semibold mb-3">Update Your Status</h2>
      <div className="flex gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s.value}
            onClick={() => handleClick(s.value)}
            className={`px-3 py-2 rounded-full text-sm border ${
              member.status === s.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusSelector;
