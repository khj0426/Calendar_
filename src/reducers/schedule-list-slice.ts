import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Schedule } from "../types/schedule";

//제목, 날짜, 시작 시간, 끝 시간

const scheduleListSlice = createSlice({
  name: "schedule-list-slice",
  initialState: [] as Array<Schedule>,
  reducers: {
    addschedule: (state, action: PayloadAction<Schedule>) => {
      state.push(action.payload);
    },
    removeschedule: (state, action: PayloadAction<string>) => {
      return state.filter((schedule) => schedule.id !== action.payload);
    },
  },
});

export const { addschedule, removeschedule } = scheduleListSlice.actions;

export default scheduleListSlice.reducer;
