import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import { useAppSelector } from "./redux/hooks";

export default function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[#f5f6fa] dark:bg-slate-900 flex items-start justify-start p-4">
        <div className="sticky top-4">
          <Sidebar />
        </div>

        <div className="flex-1 ml-6 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 min-h-[90vh]">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
