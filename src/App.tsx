import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import { useAppSelector } from "./redux/hooks";

export default function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
  <div className={mode === "dark" ? "dark" : ""}>
    <div className="min-h-screen flex gap-4 transition-all duration-300
      bg-[#edf1ff] dark:bg-[#0d1117]      /* better dark base */
      text-slate-800 dark:text-slate-200"
    >
      <div className="w-64">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 rounded-xl 
        bg-white dark:bg-[#111827] shadow-xl   /* higher contrast */
        border border-slate-200 dark:border-slate-700"
      >
        <Dashboard />
      </main>
    </div>
  </div>
);

}
