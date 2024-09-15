import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { DEV_URL } = process.env;

console.log("DEV_URL:", DEV_URL);

// Initial state for notes
const initialNotesState = {
  notes: [],
};

// Initial state for authentication (login & signup)
const initialAuthState = {
  user: null,
  error: null,
  loading: false,
};

// Fetch notes using createAsyncThunk
export const getNotes = createAsyncThunk("notes/get", async () => {
  const response = await axios.get(`${DEV_URL}/notes`);
  return response.data;
});

// Login async thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEV_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Signup async thunk
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEV_URL}/signup`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Notes slice
export const notesSlice = createSlice({
  name: "notes",
  initialState: initialNotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

// Login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Signup slice
export const signupSlice = createSlice({
  name: "signup",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector for notes
export const getAllNotes = (state) => state.notes.notes;

// Selectors for authentication state
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

// Export reducers
export const notesReducer = notesSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const signupReducer = signupSlice.reducer;
