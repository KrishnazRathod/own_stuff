/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_NOTES_URL = import.meta.env.VITE_NOTES_URL;
console.log("REACT_APP_NOTES_URL:", REACT_APP_NOTES_URL);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZmlyc3Qgbm90ZSIsImVtYWlsIjoiYWJjZEBkcy5jb20iLCJpZCI6IjY2ZTE3NzRkOGYxZmU1ZmMyMWMxMjQxOCJ9LCJpYXQiOjE3MjYwNTIxODEsImV4cCI6MTcyNjM1MjE4MX0.jTu9m0X_B6KBc9e8MG3jFfTUxj6NVtflli5OKwk-8-s";
const initialState: any = {
  notes: [],
};

export const fetchNotes = createAsyncThunk(
  "notes/get",
  async (_, thunkAPI: any) => {
    try {
      const response = await axios.get(`${REACT_APP_NOTES_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/post",
  async (requestBody: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_NOTES_URL}/notes`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (noteId: string, thunkAPI: any) => {
    try {
      await axios.delete(`${REACT_APP_NOTES_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return noteId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const notesSlice = createSlice({
  name: "notesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      console.log("action.payload: ", action.payload);
      state.notes.push(action.payload);
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note: any) => note._id !== noteId);
    });
  },
});

export const getNotes = (state: any) => state.notesSlice.notes;

export default notesSlice.reducer;
