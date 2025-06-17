// src/redux/slices/message.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MessageService from '../service/message.service';
import { ChatMessage, CreateMessagePayload } from '../type/message.types';

const messageService = new MessageService();

interface MessageState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

// Thunks

export const fetchMessagesBySessionId = createAsyncThunk(
  'messages/fetchBySessionId',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await messageService.getMessagesBySessionId(sessionId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postMessage = createAsyncThunk(
  'messages/post',
  async (payload: CreateMessagePayload, { rejectWithValue }) => {
    try {
      const response = await messageService.createMessage(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearMessages(state) {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessagesBySessionId
      .addCase(fetchMessagesBySessionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesBySessionId.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessagesBySessionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // postMessage
      .addCase(postMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
