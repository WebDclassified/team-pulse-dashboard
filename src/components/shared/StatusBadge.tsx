import type { Status } from "../../types";

const colors: Record<Status, string> = {
  working: "bg-green-100 text-green-700",
  break: "bg-yellow-100 text-yellow-700",
  meeting: "bg-blue-100 text-blue-700",
  offline: "bg-slate-200 text-slate-700",
};

interface Props {
  status: Status;
}

const StatusBadge = ({ status }: Props) => (
  <span
    className={`inline-flex items-center px-2 py-1 text-xs rounded-full capitalize ${colors[status]}`}
  >
    {status}
  </span>
);

export default StatusBadge;
