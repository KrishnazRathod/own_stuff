import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesSlice from "../NotesSlice";

export const rootReducer = combineReducers({
  notesSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
