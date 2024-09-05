import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
};

export const getNotes = createAsyncThunk("notes/get", async () => {
  const response = await axios.get(`${process.env.DEV_URL}/notes`);
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
