import type { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "0 Jan", value: 30 },
  { date: "31 Jan", value: 45 },
  { date: "22 Feb", value: 38 },
  { date: "15 Mar", value: 55 },
  { date: "05 Apr", value: 70 },
  { date: "26 Apr", value: 52 },
  { date: "17 May", value: 60 },
  { date: "08 Jun", value: 65 },
  { date: "29 Jun", value: 50 },
  { date: "20 Jul", value: 54 },
];

const EmployeesInfoChart: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="font-semibold mb-4">Employees Info</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              contentStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: "#f97316", fill: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeesInfoChart;
