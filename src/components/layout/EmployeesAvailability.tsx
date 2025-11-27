import type { FC } from "react";
import {
  FiCheckSquare,
  FiClock,
  FiSlash,
  FiUmbrella,
} from "react-icons/fi";

interface EmployeesAvailabilityProps {
  attendance: number;
  late: number;
  absent: number;
  leave: number;
}

const EmployeesAvailability: FC<EmployeesAvailabilityProps> = ({
  attendance,
  late,
  absent,
  leave,
}) => {
  const cards = [
    {
      label: "Attendance",
      value: attendance,
      icon: FiCheckSquare,
    },
    {
      label: "Late Coming",
      value: late,
      icon: FiClock,
    },
    {
      label: "Absent",
      value: absent,
      icon: FiSlash,
    },
    {
      label: "Leave Apply",
      value: leave,
      icon: FiUmbrella,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="font-semibold mb-4">Employees Availability</h2>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border border-slate-100 rounded-lg px-3 py-4 flex flex-col gap-2 text-sm"
          >
            <Icon className="text-slate-500" size={20} />
            <div className="font-semibold">{label}</div>
            <div className="text-xs text-slate-500">
              {value.toString().padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesAvailability;
