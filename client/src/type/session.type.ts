// src/type/session.type.ts

export interface Session {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  __v: number;
}

export interface CreateSessionRequest {
  title: string;
  // userId:string;
}



export interface CreateSessionResponse extends Session {}

export type GetSessionsResponse = Session[];
