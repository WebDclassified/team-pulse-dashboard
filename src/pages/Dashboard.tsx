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

import { useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { currentRole } = useAppSelector((state) => state.role);
  const members = useAppSelector((state) => state.members.list);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  // fetch employees for dashboard (already had)
  useEffect(() => {
    dispatch(fetchDashboardEmployees());
  }, [dispatch]);

  // 👇 NEW: auto-reset statuses after inactivity
  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch(checkInactivity({ now: Date.now() }));
    }, 60_000); // check every 1 min

    return () => window.clearInterval(id);
  }, [dispatch]);

  // Derive stats from random user data

  const availabilityStats = useMemo(() => {
    const attendance = Math.round(totalEmployees * 0.9);
    const lateComing = Math.round(totalEmployees * 0.04);
    const absent = totalEmployees - attendance;
    const leaveApply = Math.round(totalEmployees * 0.1);

    return {
      attendance,
      lateComing,
      absent,
      leaveApply,
    };
  }, [totalEmployees]);

  // Team status summary (from Redux members)
  const { summary, sortedMembers } = useMemo(() => {
    const summary = {
      working: 0,
      meeting: 0,
      break: 0,
      offline: 0,
    };

    members.forEach((m) => {
      summary[m.status] += 1;
    });

    const filtered =
      statusFilter === "all"
        ? members
        : members.filter((m) => m.status === statusFilter);

    const sorted = [...filtered].sort((a, b) => {
      const activeA = a.tasks.filter((t) => !t.completed).length;
      const activeB = b.tasks.filter((t) => !t.completed).length;
      return activeB - activeA;
    });

    return { summary, sortedMembers: sorted };
  }, [members, statusFilter]);

  return (
    <div className="w-full">
      {/* Top header with search + avatars */}
      <Header />

      {/* =============== TOP ANALYTICS + RIGHT PANEL SECTION =============== */}
      <section className="mb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: charts and availability */}
        <div className="xl:col-span-2 space-y-6">
          {/* Employees Info line chart */}
          <EmployeesInfoChart />

          {/* Employees Availability + Total Employees donut */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmployeesAvailability
              attendance={availabilityStats.attendance}
              late={availabilityStats.lateComing}
              absent={availabilityStats.absent}
              leave={availabilityStats.leaveApply}
            />

            <TotalEmployeesDonut male={maleCount} female={femaleCount} />
          </div>
        </div>

        {/* RIGHT: applications, interviews, hired, upcoming interviews */}
        <RightStatsPanel />
      </section>

      {/* =================== ROLE-BASED ASSIGNMENT SECTION =================== */}
      {currentRole === "lead" ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Summary + filters */}
            <div className="p-4 bg-white rounded-xl shadow-sm flex flex-wrap gap-4 justify-between items-center">
              <div className="space-y-1">
                <h2 className="font-semibold">Team Status Overview</h2>
                <p className="text-sm text-slate-500">
                  {summary.working} Working · {summary.meeting} Meeting ·{" "}
                  {summary.break} Break · {summary.offline} Offline
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {["all", "working", "meeting", "break", "offline"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s as Status | "all")}
                    className={`px-3 py-1 rounded-full border ${
                      statusFilter === s
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {s.toString().charAt(0).toUpperCase() +
                      s.toString().slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Member cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {sortedMembers.map((member) => {
                const activeTasks = member.tasks.filter(
                  (t) => !t.completed
                ).length;
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    activeTasks={activeTasks}
                  />
                );
              })}
            </div>
          </div>

          {/* Task assignment form */}
          <div>
            <TaskForm />
          </div>
        </section>
      ) : (
        // =================== MEMBER VIEW ===================
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StatusSelector />
          </div>
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
