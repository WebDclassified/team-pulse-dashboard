import type { FC } from "react";
import { FiInfo, FiBell, FiPlus, FiSearch } from "react-icons/fi";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-100 text-sm
                       outline-none border border-slate-200 focus:ring-2
                       focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Right: Icons, active users, main user */}
      <div className="flex items-center gap-6 ml-6">
        {/* Info icon */}
        <button className="w-7 h-7 rounded-md bg-[#3f4d9b] text-white flex items-center justify-center text-xs">
          <FiInfo size={14} />
        </button>

        {/* Active users avatars + plus */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <AvatarCircle color="#facc15" />
            <AvatarCircle color="#22c55e" />
            <AvatarCircle color="#ef4444" />
            <AvatarCircle color="#3b82f6" />
            <AvatarCircle color="#eab308" />
          </div>
          <button className="w-8 h-8 rounded-full bg-[#3f4d9b] text-white flex items-center justify-center">
            <FiPlus size={16} />
          </button>
        </div>

        {/* Notification bell */}
        <button className="relative text-slate-600">
          <FiBell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Main user */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold leading-tight">Prabhat Teotia</p>
            <p className="text-[11px] text-slate-500">Admin Profile</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
            {/* simple placeholder avatar */}
            <span className="text-sm font-semibold text-slate-700">PT</span>
          </div>
        </div>
      </div>
    </header>
  );
};

interface AvatarCircleProps {
  color: string;
}

const AvatarCircle: FC<AvatarCircleProps> = ({ color }) => (
  <div
    className="w-8 h-8 rounded-full border-2 border-white"
    style={{ backgroundColor: color }}
  />
);

export default Header;
