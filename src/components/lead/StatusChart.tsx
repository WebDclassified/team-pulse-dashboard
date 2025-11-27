import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";

const colors = ["#6366f1", "#22c55e", "#eab308", "#6b7280"];

const StatusChart = () => {
  const members = useAppSelector(state => state.members.list);

  const data = [
    { name: "Working", value: members.filter(m => m.status === "working").length },
    { name: "Meeting", value: members.filter(m => m.status === "meeting").length },
    { name: "Break", value: members.filter(m => m.status === "break").length },
    { name: "Offline", value: members.filter(m => m.status === "offline").length },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h2 className="font-semibold mb-3">Status Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusChart;
    