import type { Member } from "../../types";
import StatusBadge from "../shared/StatusBadge";

interface Props {
  member: Member;
  activeTasks: number;
}

const MemberCard = ({ member, activeTasks }: Props) => {
  return (
    <div className="p-4 rounded-xl bg-white shadow-sm flex justify-between items-center">
      <div>
        <p className="font-semibold">{member.name}</p>
        <StatusBadge status={member.status} />
      </div>
      <div className="text-sm text-slate-500">
        Active tasks: <span className="font-semibold">{activeTasks}</span>
      </div>
    </div>
  );
};

export default MemberCard;
