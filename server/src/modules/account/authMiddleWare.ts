import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import AuthTokenUtil from './auth';
import { ApplicationError } from '../Application/ApplicationError';

export const basicAuthMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApplicationError(
      'Authorization header not found',
      'NOT_FOUND',
      404
    );
  }

  const [authScheme, authToken] = authHeader.split(' ');
  if (authScheme !== 'Bearer' || _.isEmpty(authToken)) {
    throw new ApplicationError(
      `Invalid authorization header. Expected format is "Bearer <token>`,
      'INVALID_TOKEN',
      401
    );
  }

  try {
    const authPayload = AuthTokenUtil.verifyAuthToken({ token: authToken });

    req.user = authPayload;

    next();
  } catch (error) {
    throw new ApplicationError(
      "Invalid or expired token",
      'INVALID_TOKEN',
      402
    );
  }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApplicationError(
        'Forbidden: Insufficient role',
        'FORBIDDEN',
        403
      );
    }
    next();
  };
};