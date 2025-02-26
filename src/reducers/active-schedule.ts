import type { Schedule } from "../types/schedule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const activeSchedule = createSlice({
  name: "active-schedule-slice",
  initialState: {
    id: "",
    title: "",
    startTime: "",
    endTime: "",
    date: "",
  } as Schedule,
  reducers: {
    setActiveSchedule: (state, { payload }: PayloadAction<Schedule>) => {
      state.date = payload.date;
      state.title = payload.title;
      state.endTime = payload.endTime;
      state.startTime = payload.startTime;
      state.id = payload.id;
    },
  },
});

export const { setActiveSchedule } = activeSchedule.actions;
export default activeSchedule.reducer;
