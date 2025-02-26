import { combineReducers, configureStore } from "@reduxjs/toolkit";

import scheduleReducer from "../reducers/schedule-slice";
import calendarReducer from "../reducers/calendar-slice";

import localStorage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";

//새로고침 시에도 반영되게 세팅
const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["schedule"],
};

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  calendar: calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
