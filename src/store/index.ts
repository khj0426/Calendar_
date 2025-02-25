import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;
