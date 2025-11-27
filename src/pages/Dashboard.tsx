import { useEffect, useMemo, useState } from "react";
import type { Status } from "../types";

import Header from "../components/layout/Header";
import EmployeesInfoChart from "../components/layout/EmployeesInfoChart";
import EmployeesAvailability from "../components/layout/EmployeesAvailability";
import TotalEmployeesDonut from "../components/layout/TotalEmployeesDonut";
import RightStatsPanel from "../components/layout/RightStatsPanel";

import MemberCard from "../components/lead/MemberCard";
import TaskForm from "../components/lead/TaskForm";
import StatusSelector from "../components/member/StatusSelector";
import TaskList from "../components/member/TaskList";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchDashboardEmployees } from "../redux/slices/dashboardSlice";
import { checkInactivity } from "../redux/slices/membersSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { currentRole } = useAppSelector(s => s.role);
  const members = useAppSelector(s => s.members.list);

  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  useEffect(() => { dispatch(fetchDashboardEmployees()) }, []);
  useEffect(() => {
    const i = setInterval(() => dispatch(checkInactivity({ now: Date.now() })), 60000);
    return () => clearInterval(i);
  }, []);

  const { summary, sortedMembers } = useMemo(() => {
    const summary = { working:0, meeting:0, break:0, offline:0 };

    members.forEach(m => summary[m.status]++);

    const filtered =
      statusFilter === "all"
      ? members
      : members.filter(m => m.status === statusFilter);

    const sorted = [...filtered].sort((a,b) => 
      b.tasks.filter(t=>!t.completed).length -
      a.tasks.filter(t=>!t.completed).length
    );

    return { summary, sortedMembers: sorted };
  }, [members,statusFilter]);

  return (
    <div className="w-full">
      
      <Header />

      {/* -------- Top Row Analytics -------- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Left Charts Block */}
        <div className="xl:col-span-2 space-y-6">
          <EmployeesInfoChart />
          <div className="grid md:grid-cols-2 gap-6">
            <EmployeesAvailability />
            <TotalEmployeesDonut />
          </div>
        </div>

        <RightStatsPanel />
      </div>

      {/* -------- ROLE BASED SECTION -------- */}
      {currentRole === "lead" ? (

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-5">
            <div className="p-4 bg-white border rounded-xl shadow-sm">
              <h2 className="font-semibold mb-1">Team Status Overview</h2>
              <p className="text-sm text-slate-600">
                {summary.working} Working · {summary.meeting} Meeting · {summary.break} Break · {summary.offline} Offline
              </p>

              <div className="flex gap-2 mt-3 text-xs">
                {["all","working","meeting","break","offline"].map(s=>(
                  <button key={s}
                    onClick={()=>setStatusFilter(s as any)}
                    className={`px-3 py-1 rounded-full border ${
                      statusFilter === s
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-slate-300"
                    }`}
                  >
                    {s[0].toUpperCase()+s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sortedMembers.map(m => {
                let active = m.tasks.filter(t=>!t.completed).length;
                return <MemberCard key={m.id} member={m} activeTasks={active}/>
              })}
            </div>
          </div>

          <TaskForm />
        </div>

      ) : (
        
        <div className="grid lg:grid-cols-3 gap-6">
          <StatusSelector />
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>

      )}
    </div>
  )
}

export default Dashboard;
