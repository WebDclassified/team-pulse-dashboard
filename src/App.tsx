import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen flex gap-4 bg-[#f5f6fa] p-4">
      
      <div className="w-64">
        <Sidebar />
      </div>

      <main className="flex-1 bg-white p-6 rounded-xl shadow-xl border border-slate-200">
        <Dashboard />
      </main>

    </div>
  );
}
