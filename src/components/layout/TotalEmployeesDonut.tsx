import type { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";

const COLORS = ["#60a5fa", "#f472b6"]; 

const TotalEmployeesDonut: FC = () => {
  const { maleCount, femaleCount } = useAppSelector(
    (state) => state.dashboard
  );

  const data = [
    { name: "Men", value: maleCount },
    { name: "Women", value: femaleCount },
  ];

  const total = maleCount + femaleCount || 0;

  return (
    <div className="bg-white  rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between mb-4">
        <h2 className="font-semibold">Total Employees</h2>
        <span className="text-2xl font-bold">{total}</span>
      </div>

      <div className="h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 text-xs mt-3">
        <LegendDot color={COLORS[0]} label="Men" />
        <LegendDot color={COLORS[1]} label="Women" />
      </div>
    </div>
  );
};

interface LegendDotProps {
  color: string;
  label: string;
}

const LegendDot: FC<LegendDotProps> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    />
    <span>{label}</span>
  </div>
);

export default TotalEmployeesDonut;
