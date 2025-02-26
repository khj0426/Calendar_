import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  formatDate,
  subWeeks,
  format,
  addWeeks,
  addMonths,
  subMonths,
} from "date-fns";

const calendarSlice = createSlice({
  name: "calendar-slice",
  initialState: {
    date: formatDate(new Date(), "yyyy-MM-dd"),
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
    shiftToNextMonthReducer: (state) => {
      const nextMonthDate = addMonths(new Date(state.date), 1);
      state.date = format(nextMonthDate, "yyyy-MM-dd");
    },
    shiftToPrevMonthReducer: (state) => {
      const prevMonthDate = subMonths(new Date(state.date), 1);
      state.date = format(prevMonthDate, "yyyy-MM-dd");
    },
    setDateReducer: (state, action: PayloadAction<string>) => {
      //유효한 날짜인지 검증
      state.date = format(new Date(action.payload), "yyyy-MM-dd");
    },
  },
});

export const {
  setDateReducer,
  shiftToNextWeekReducer,
  shiftToPrevWeekReducer,
  shiftToNextMonthReducer,
  shiftToPrevMonthReducer,
} = calendarSlice.actions;

export default calendarSlice.reducer;
