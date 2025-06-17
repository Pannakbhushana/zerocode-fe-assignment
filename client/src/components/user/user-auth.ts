import { Token, UserInfoType } from "../../type/auth.type";

// src/components/user/useAuthStorage.ts
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): Token | null => {
  const authToken = localStorage.getItem('token');
  const tokenObj =authToken ? JSON.parse(authToken) : null;
  return tokenObj
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setUserInfo = (userInfo: UserInfoType): void => {
  try {
    const json = JSON.stringify(userInfo);
    localStorage.setItem('userInfo', json);
  } catch (err) {
    console.error('Failed to save userInfo to localStorage', err);
  }
};

export const getUserInfo = (): UserInfoType | null => {
  const stored = localStorage.getItem('userInfo');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as UserInfoType;
  } catch (err) {
    console.error('Could not parse userInfo from localStorage', err);
    return null;
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem('userInfo');
};