import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RoleState, Role } from "../../types";

const initialState: RoleState = {
  currentRole: "member",
  currentUserId: "1", 
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<Role>) => {
      state.currentRole = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { switchRole, setCurrentUser } = roleSlice.actions;
export default roleSlice.reducer;
