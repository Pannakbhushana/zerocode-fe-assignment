// src/services/session.service.ts

import APIService from './api.service';
import {
  CreateSessionRequest,
  CreateSessionResponse,
  GetSessionsResponse,
  Session,
} from '../type/session.type';

export default class SessionService extends APIService {
  constructor() {
    super();
  }

  async createSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    try {
      const response = await this.apiClient.post<CreateSessionResponse>(
        '/chat/new-session',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        _id: '',
        userId: '',
        title: '',
        createdAt: '',
        __v: 0,
        error: {
          code: 'UnknownError',
          message: 'Failed to create session.',
        },
      };
    }
  }

  async getAllSessions(): Promise<GetSessionsResponse> {
    try {
      const response = await this.apiClient.get<GetSessionsResponse>(
        '/chat/sessions'
      );
      return response.data;
    } catch (error: any) {
      return [];
    }
  }

   async updateSession(data: { sessionId: string, newTitle: string }): Promise<Session> {
  try {
    const response = await this.apiClient.patch<Session>(
      '/chat/session/update',
      data
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || {
      _id: '',
      userId: '',
      title: '',
      createdAt: '',
      __v: 0,
      error: {
        code: 'UnknownError',
        message: 'Failed to update session.',
      },
    };
  }
}

async deleteAllSessions(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await this.apiClient.delete('/chat/session/delete');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete sessions.',
    };
  }
}
}
