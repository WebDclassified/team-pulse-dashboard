// src/redux/slices/membersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Member, Status, Task } from "../../types";
import { nanoid } from "@reduxjs/toolkit";

interface MembersState {
  list: Member[];
}

const now = Date.now();

const initialState: MembersState = {
  list: [
    {
      id: "1",
      name: "John Doe",
      status: "working",
      tasks: [],
      lastActiveAt: now,
    },
    {
      id: "2",
      name: "Jane Smith",
      status: "meeting",
      tasks: [],
      lastActiveAt: now,
    },
  ],
};

interface AssignTaskPayload {
  memberId: string;
  title: string;
  dueDate: string;
}

interface UpdateStatusPayload {
  memberId: string;
  status: Status;
}

interface UpdateTaskProgressPayload {
  memberId: string;
  taskId: string;
  delta: number;
}

interface CheckInactivityPayload {
  now: number;
}

const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      state.list = action.payload;
    },
    updateStatus(state, action: PayloadAction<UpdateStatusPayload>) {
      const member = state.list.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) {
        member.status = action.payload.status;
        member.lastActiveAt = Date.now();
      }
    },
    assignTask(state, action: PayloadAction<AssignTaskPayload>) {
      const member = state.list.find(
        (m) => m.id === action.payload.memberId
      );
      if (!member) return;

      const newTask: Task = {
        id: nanoid(),
        title: action.payload.title,
        dueDate: action.payload.dueDate,
        progress: 0,
        completed: false,
      };

      member.tasks.push(newTask);
      member.lastActiveAt = Date.now();
    },
    updateTaskProgress(
      state,
      action: PayloadAction<UpdateTaskProgressPayload>
    ) {
      const { memberId, taskId, delta } = action.payload;
      const member = state.list.find((m) => m.id === memberId);
      if (!member) return;

      const task = member.tasks.find((t) => t.id === taskId);
      if (!task) return;

      const next = Math.min(100, Math.max(0, task.progress + delta));
      task.progress = next;
      task.completed = next === 100;
      member.lastActiveAt = Date.now();
    },
    // 👇 NEW: auto-reset to offline after 10 minutes of inactivity
    checkInactivity(state, action: PayloadAction<CheckInactivityPayload>) {
      const { now } = action.payload;
      state.list.forEach((member) => {
        if (
          member.status !== "offline" &&
          now - member.lastActiveAt > INACTIVITY_LIMIT_MS
        ) {
          member.status = "offline";
        }
      });
    },
  },
});

export const {
  setMembers,
  updateStatus,
  assignTask,
  updateTaskProgress,
  checkInactivity,
} = membersSlice.actions;

export default membersSlice.reducer;
