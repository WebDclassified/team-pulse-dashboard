import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import $ from "jquery";

// ==================== STATE INTERFACES ====================
interface RandomEmployee {
  id: string;
  gender: "male" | "female";
}

interface UpcomingInterview {
  id: number;
  name: string;
  role: string;
  time: string;
  color: string;
}

interface DashboardState {
  loading: boolean;
  error: string | null;

  // API Employees
  employees: RandomEmployee[];
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;

  // Analytics
  attendance: number;
  lateComing: number;
  absent: number;
  leaveApply: number;

  applications: number;
  interviews: number;
  hired: number;

  upcomingInterviews: UpcomingInterview[];
}

// ==================== THUNK USING $.ajax() ====================
export const fetchDashboardEmployees = createAsyncThunk<
  RandomEmployee[]
>("dashboard/fetchEmployees", async () => {
  const data = await new Promise<any>((resolve, reject) => {
    $.ajax({
      url: "https://randomuser.me/api/?results=30",
      dataType: "json",
      success(response) {
        resolve(response);
      },
      error(_xhr, _status, errorThrown) {
        reject(errorThrown);
      },
    });
  });

  return (data.results || []).map((u: any) => ({
    id: u.login?.uuid ?? crypto.randomUUID(),
    gender: u.gender === "male" ? "male" : "female",
  }));
});

// ==================== INITIAL STATE ====================
const initialState: DashboardState = {
  loading: false,
  error: null,
  employees: [],
  totalEmployees: 423, // fallback defaults
  maleCount: 260,
  femaleCount: 163,
  attendance: 400,
  lateComing: 17,
  absent: 6,
  leaveApply: 14,
  applications: 1546,
  interviews: 246,
  hired: 101,
  upcomingInterviews: [
    { id: 1, name: "Natalie Gibson", role: "UI/UX Designer", time: "1.30 - 1.30", color: "#facc15" },
    { id: 2, name: "Peter Piper", role: "Web Designer", time: "9.00 - 1.30", color: "#f97316" },
    { id: 3, name: "John Carter", role: "Product Manager", time: "11.00 - 12.00", color: "#22c55e" },
  ],
};

// ==================== SLICE ====================
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<number>) {
      state.applications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;

        state.totalEmployees = action.payload.length;
        state.maleCount = action.payload.filter(e => e.gender === "male").length;
        state.femaleCount = action.payload.filter(e => e.gender === "female").length;

        const t = state.totalEmployees || 1;
        state.attendance = Math.round(t * 0.9);
        state.lateComing = Math.round(t * 0.04);
        state.absent = t - state.attendance;
        state.leaveApply = Math.round(t * 0.1);
      })
      .addCase(fetchDashboardEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load data";
      });
  },
});

export const { setApplications } = dashboardSlice.actions;
export default dashboardSlice.reducer;
