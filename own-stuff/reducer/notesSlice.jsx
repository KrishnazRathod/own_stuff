import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { DEV_URL } = process.env;

const initialState = {
  notes: [],
};
console.log("DEV_URL:", DEV_URL);

export const getNotes = createAsyncThunk("notes/get", async () => {
  const response = await axios.get(`${DEV_URL}/notes`);
  return response.data;
});

export const counterSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export const getAllNotes = (state) => state.notes.notes;

export default counterSlice.reducer;
