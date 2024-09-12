import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesSlice from "../NotesSlice";

export const rootReducer = combineReducers({
  notesSlice,
});

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export default store;
