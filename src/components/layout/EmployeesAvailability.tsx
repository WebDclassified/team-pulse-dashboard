import type { FC } from "react";
import {
  FiCheckSquare,
  FiClock,
  FiSlash,
  FiUmbrella,
} from "react-icons/fi";
import { useAppSelector } from "../../redux/hooks";

const EmployeesAvailability: FC = () => {
  const { attendance, lateComing, absent, leaveApply } = useAppSelector(
    (state) => state.dashboard
  );

  const cards = [
    { label: "Attendance", value: attendance, icon: FiCheckSquare },
    { label: "Late Coming", value: lateComing, icon: FiClock },
    { label: "Absent", value: absent, icon: FiSlash },
    { label: "Leave Apply", value: leaveApply, icon: FiUmbrella },
  ];

  return (
    <div className="bg-white  rounded-xl shadow-sm p-4">
      <h2 className="font-semibold mb-4">Employees Availability</h2>

      <div className="grid grid-cols-2 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border border-slate-200 dark:border-slate-600 rounded-lg p-3 flex flex-col gap-2 text-sm"
          >
            <Icon className="text-slate-500 dark:text-slate-300" size={20} />
            <span className="font-semibold">{label}</span>
            <span className="text-[13px] text-slate-500 dark:text-slate-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesAvailability;
