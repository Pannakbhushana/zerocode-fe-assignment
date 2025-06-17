// src/redux/slices/chatSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatBotService from '../service/chat.service';
import { ChatRequestBody, ChatResponse } from '../type/chat.type';

const chatService = new ChatBotService();

interface ChatState {
    messages: { role: 'user' | 'bot'; text: string }[];
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null,
};

// Async thunk to send message to chatbot
export const fetchChatResponse = createAsyncThunk<
    ChatResponse,
    ChatRequestBody,
    { rejectValue: string }
>('chat/fetchChatResponse', async (payload, { rejectWithValue }) => {
    const response = await chatService.sendMessageToBot(payload);

    if ('error' in response && typeof response.error === 'object' && response.error !== null && 'message' in response.error) {
        return rejectWithValue((response.error as any).message || 'Unexpected error');
    }

    return response;
});

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addUserMessage(state, action) {
            state.messages.push({ role: 'user', text: action.payload });
        },
        clearMessages(state) {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatResponse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatResponse.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push({ role: 'bot', text: action.payload.response });
            })
            .addCase(fetchChatResponse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { addUserMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
