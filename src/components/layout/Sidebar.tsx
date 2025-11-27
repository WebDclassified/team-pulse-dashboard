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
  FaLayerGroup
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

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
  { label: "UI Components", icon: FaLayerGroup }
];

const Sidebar: FC = () => {
  return (
    <aside className="h-[95vh] w-64 p-6 bg-[#3f4d9b] text-white rounded-xl shadow-xl flex flex-col">
        
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">✓</div>
        <p className="text-xl font-semibold">My-Task</p>
      </div>


      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map(({ label, icon: Icon }) => (
            <li key={label}>
              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/15 transition">
                <span className="flex items-center gap-3">
                  <Icon size={16} /> {label}
                </span>
                <FiChevronDown size={14} />
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
