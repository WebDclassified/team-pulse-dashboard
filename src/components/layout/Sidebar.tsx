import type { FC } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaTicketAlt,
  FaUsers,
  FaUserTie,
  FaFileInvoiceDollar,
  FaMobileAlt,
  FaCode,
  FaLayerGroup,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/slices/themeSlice";

const menuItems = [
  { label: "Dashboard", icon: FaTachometerAlt },
  { label: "Projects", icon: FaTasks },
  { label: "Tickets", icon: FaTicketAlt },
  { label: "Our Clients", icon: FaUserTie },
  { label: "Employees", icon: FaUsers },
  { label: "Accounts", icon: FaFileInvoiceDollar },
  { label: "Payroll", icon: FaFileInvoiceDollar },
  { label: "App", icon: FaMobileAlt },
  { label: "Other Pages", icon: FaCode },
  { label: "UI Components", icon: FaLayerGroup },
];

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <aside className="h-screen w-64 bg-[#3f4d9b] text-white shadow-xl rounded-xl p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
          <span className="w-7 h-7 flex items-center justify-center text-sm border-2 border-white rounded-lg font-bold">
            ✓
          </span>
        </div>
        <p className="text-xl font-semibold tracking-wide">My-Task</p>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map(({ label, icon: Icon }) => (
            <li key={label}>
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition duration-200"
                type="button"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                <FiChevronDown size={14} className="opacity-80" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-6 border-t border-white/15 space-y-3 text-xs">
        <ToggleSwitch
          label="Enable Dark Mode!"
          enabled={isDark}
          onClick={() => dispatch(toggleTheme())}
        />
        <ToggleSwitch label="Enable RTL Mode!" enabled={false} />
      </div>
    </aside>
  );
};

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onClick?: () => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  label,
  enabled,
  onClick,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          enabled ? "bg-emerald-400" : "bg-white/40"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transform transition-transform ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;
