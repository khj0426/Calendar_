import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "date-fns";

const calendarSlice = createSlice({
  name: "calendar-slice",
  initialState: {
    date: formatDate(new Date(), "yyyy-MM-dd"),
    schedule: [],
  },
  // 필요한 리듀서 정의
  reducers: {
    shiftToPrevWeekReducer: () => {},
    shiftToNextWeekReducer: () => {},
    setDateReducer: () => {},
  },
});

export const {
  setDateReducer,
  shiftToNextWeekReducer,
  shiftToPrevWeekReducer,
} = calendarSlice.actions;

export default calendarSlice.reducer;
