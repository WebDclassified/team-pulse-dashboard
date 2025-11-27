import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice";
import roleReducer from "./slices/roleSlice";
import dashboardReducer from "./slices/dashboardSlice";

const PERSIST_KEY = "teamPulseState";

// function loadState() {
//   try {
//     const serialized = localStorage.getItem(PERSIST_KEY);
//     if (!serialized) return undefined;
//     return JSON.parse(serialized);
//   } catch {
//     return undefined;
//   }
// }

export const store = configureStore({
  reducer: {                     
    members: membersReducer,
    role: roleReducer,
    dashboard: dashboardReducer,
  }
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const toPersist = {
      members: state.members,
      role: state.role,
      dashboard: state.dashboard,
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toPersist));
  } catch {
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
