import type { FC } from "react";
import { FiBarChart2, FiUsers, FiTrendingUp, FiClock } from "react-icons/fi";

const RightStatsPanel: FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-[#3f4d9b] dark:bg-[#0e1838] rounded-xl p-4 shadow-md text-white">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <span className="text-lg font-semibold">📝</span>
          </div>
          <div className="text-3xl font-bold leading-tight">1546</div>
          <div className="text-sm opacity-90">Applications</div>
        </div>

        <div className="w-24 h-24 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/80">
          Illustration
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <FiUsers className="text-green-600" />
          </div>
          <div>
            <div className="text-xl font-bold leading-tight">246</div>
            <div className="text-xs text-slate-500">Interviews</div>
          </div>
        </div>
        <FiBarChart2 className="text-slate-400" size={20} />
      </div>

      <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiTrendingUp className="text-emerald-600" />
          </div>
          <div>
            <div className="text-xl font-bold leading-tight">101</div>
            <div className="text-xs text-slate-500">Hired</div>
          </div>
        </div>
        <FiBarChart2 className="text-slate-400" size={20} />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-4 text-sm">Upcoming Interviews</h2>

        <div className="space-y-3 text-sm">
          <InterviewRow
            name="Natalie Gibson"
            role="UI/UX Designer"
            time="1.30 - 1.30"
            color="#facc15"
          />
          <InterviewRow
            name="Peter Piper"
            role="Web Designer"
            time="9.00 - 1.30"
            color="#f97316"
          />
          <InterviewRow
            name="John Carter"
            role="Product Manager"
            time="11.00 - 12.00"
            color="#22c55e"
          />
        </div>
      </div>
    </div>
  );
};

interface InterviewRowProps {
  name: string;
  role: string;
  time: string;
  color: string;
}

const InterviewRow: FC<InterviewRowProps> = ({ name, role, time, color }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold leading-tight">{name}</div>
          <div className="text-[11px] text-slate-500">{role}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <FiClock size={12} />
        <span>{time}</span>
      </div>
    </div>
  );
};

export default RightStatsPanel;
