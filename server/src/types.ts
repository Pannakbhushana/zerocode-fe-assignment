import express from 'express'

export enum status {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILED = 'FAILED'
} 

export interface RouteConfig {
    path: string;
    router: express.Router;
  }