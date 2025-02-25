import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDate, subWeeks, format, addWeeks } from "date-fns";
import type { Schedule } from "../types/schedule";

const calendarSlice = createSlice({
  name: "calendar-slice",
  initialState: {
    date: formatDate(new Date(), "yyyy-MM-dd"),
    schedule: [] as Schedule[],
  },
  // 필요한 리듀서 정의
  reducers: {
    shiftToPrevWeekReducer: (state) => {
      const prevWeekDate = subWeeks(new Date(state.date), 1);
      state.date = format(prevWeekDate, "yyyy-MM-dd");
    },
    shiftToNextWeekReducer: (state) => {
      const nextWeekDate = addWeeks(new Date(state.date), 1);
      state.date = format(nextWeekDate, "yyyy-MM-dd");
    },
    setDateReducer: (state, action: PayloadAction<string>) => {
      //유효한 날짜인지 검증
      state.date = action.payload;
    },
    addNewScheduleReducer: (state, action: PayloadAction<Schedule>) => {
      state.schedule.push(action.payload);
    },
    removeScheduleReducer: (state, action: PayloadAction<string>) => {
      state.schedule = state.schedule.filter(
        (schedule) => schedule.id !== action.payload
      );
    },
  },
});

export const {
  setDateReducer,
  shiftToNextWeekReducer,
  shiftToPrevWeekReducer,
} = calendarSlice.actions;

export default calendarSlice.reducer;
