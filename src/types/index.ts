// src/types/index.ts
export type Status = "working" | "break" | "meeting" | "offline";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  completed: boolean;
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  status: Status;
  tasks: Task[];

  // 👇 NEW: used for auto-reset
  lastActiveAt: number; // timestamp (Date.now())
}

export type Role = "lead" | "member";

export interface RoleState {
  currentRole: Role;
  currentUserId: string;
}
