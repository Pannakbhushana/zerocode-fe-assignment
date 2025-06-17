// src/redux/slices/session.slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SessionService from '../service/session.service';
import { CreateSessionRequest, Session } from '../type/session.type';


interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
};

const sessionService = new SessionService();

// Thunk for creating a new session
export const createSession = createAsyncThunk(
  'session/create',
  async (data: CreateSessionRequest, { rejectWithValue }) => {
    try {
      const res = await sessionService.createSession(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error?.message || 'Failed to create session');
    }
  }
);

export const updateSession = createAsyncThunk(
  'session/update',
  async (data: { sessionId: string, newTitle: string }, { rejectWithValue }) => {
    try {
      const res = await sessionService.updateSession(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error?.message || 'Failed to create session');
    }
  }
);

// Delete all sessions
export const deleteAllSessions = createAsyncThunk(
  'session/deleteAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await sessionService.deleteAllSessions();
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error?.message || 'Failed to delete all sessions');
    }
  }
);

// Thunk for fetching all sessions
export const getAllSessions = createAsyncThunk(
  'session/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await sessionService.getAllSessions();
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error?.message || 'Failed to fetch sessions');
    }
  }
);

// Session slice
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create session
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.unshift(action.payload); // insert at top
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update session
      .addCase(updateSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sessions.findIndex(
          (session) => session._id === action.payload._id
        );
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get all sessions
      .addCase(getAllSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(getAllSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

       // Delete all sessions
      .addCase(deleteAllSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllSessions.fulfilled, (state) => {
        state.loading = false;
        state.sessions = [];
      })
      .addCase(deleteAllSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sessionSlice.reducer;
