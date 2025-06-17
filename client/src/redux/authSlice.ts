import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../service/auth.service';
import {
  LoginRequest,
  LoginResponse,
  LoginSuccessResponse,
  SignupErrorResponse,
  SignupRequest,
  SignupSuccessResponse,
  UserInfoType,
  VerifyOtpRequest,
  VerifyOtpResponse,
  SendResetOtpRequest,
  SendResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  DeleteAccountResponse,
  DeleteAccountRequest,
  DeleteAccountErrorResponse,
} from '../type/auth.type';
import { getUserInfo, removeToken, removeUserInfo, setToken, setUserInfo } from '../components/user/user-auth';
import { constMsg } from '../components/constant/index';

const authService = new AuthService();

interface AuthState {
  user: SignupSuccessResponse['user'] | null;
  loading: boolean;
  token: string | null;
  endDate: number | null;
  userInfo: UserInfoType | null;
  error: string | null;
  message: string | null;
  otpVerified: boolean;
}

const storedToken = localStorage.getItem("token");
const parsedToken = storedToken ? JSON.parse(storedToken) : null;
const parsedUserInfo: UserInfoType | null = getUserInfo();

const initialState: AuthState = {
  user: null,
  userInfo: parsedUserInfo || null,
  token: parsedToken?.token || null,
  endDate: parsedToken?.endDate || null,
  loading: false,
  error: null,
  message: null,
  otpVerified: false,
};

// Async Thunk for Signup
export const signup = createAsyncThunk<
  SignupSuccessResponse,
  SignupRequest,
  { rejectValue: string }
>('auth/signup', async (signupData, { rejectWithValue }) => {
  const response = await authService.signup(signupData);

  if ('error' in response) {
    return rejectWithValue(response.error.message);
  }

  return response;
});

// Async Thunk for OTP Verification
export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpRequest,
  { rejectValue: string }
>('auth/verifyOtp', async (otpData, { rejectWithValue }) => {
  const response = await authService.verifyOtp(otpData);

  if ('error' in response) {
    return rejectWithValue(response.error.message);
  }

  return response;
});

// Async Thunk for uer login
export const login = createAsyncThunk<
  LoginSuccessResponse,
  LoginRequest,
  { rejectValue: SignupErrorResponse }
>('auth/login', async (loginData, { rejectWithValue }) => {
  const response: LoginSuccessResponse | SignupErrorResponse = await authService.login(loginData);
  if ("error" in response) {
    return rejectWithValue(response as SignupErrorResponse);
  }
  return response;
});

// Send Reset OTP Thunk
export const sendResetOtp = createAsyncThunk<
  SendResetOtpResponse,
  SendResetOtpRequest,
  { rejectValue: string }
>('auth/sendResetOtp', async (data, { rejectWithValue }) => {
  const response = await authService.sendResetOtp(data);
  if ('error' in response) {
    return rejectWithValue(response.error.message);
  }
  return response;
});

// Reset Password Thunk
export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>('auth/resetPassword', async (data, { rejectWithValue }) => {
  const response = await authService.resetPassword(data);
  if ('error' in response) {
    return rejectWithValue(response.error.message);
  }
  return response;
});

// Delete Account Thunk
export const deleteAccount = createAsyncThunk<
  DeleteAccountResponse,
  DeleteAccountRequest,
  {
    rejectValue: DeleteAccountErrorResponse['error'];
  }
>('auth/deleteAccount', async (data, { rejectWithValue }) => {
  const response = await authService.deleteAccount(data);

  if ('error' in response) {
    return rejectWithValue(response.error);
  }

  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.endDate = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      state.otpVerified = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<SignupSuccessResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || constMsg.SIGNUP_FAILD;
      })

      // OTP Verification Reducers
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.loading = false;
        if ("user" in action.payload) {
          state.otpVerified = true;
          state.message = action.payload.message;
          state.error = null;

          const tokenData = {
            token: action.payload?.user?.token.token,
            endDate: action.payload?.user?.token?.endDate,
          };

          const userInfo = {
            userId: action.payload?.user?.details?._id,
            name: action.payload?.user?.details?.name,
            email: action.payload?.user?.details?.email,
          }

          state.token = tokenData?.token;
          state.endDate = tokenData?.endDate;
          state.userInfo = userInfo

          setToken(JSON.stringify(action.payload?.user?.token));
          // setUserName(action.payload?.user?.details?.name)
          setUserInfo(userInfo)
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || constMsg.OTP_ERROR;
        state.otpVerified = false;
      })

      // Login Reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse | SignupErrorResponse>) => {
        state.loading = false;
        if ("user" in action.payload) {
          state.otpVerified = true;
          state.message = action.payload.message;
          state.error = null;

          const tokenData = {
            token: action.payload?.user?.token.token,
            endDate: action.payload?.user?.token?.endDate,
          };

          const userInfo = {
            userId: action.payload?.user?.details?._id,
            name: action.payload?.user?.details?.name,
            email: action.payload?.user?.details?.email,
          }

          state.token = tokenData?.token;
          state.endDate = tokenData?.endDate;
          state.userInfo = userInfo

          setToken(JSON.stringify(action.payload?.user?.token));
          // setUserName(action.payload?.user?.details?.name)
          setUserInfo(userInfo)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Login failed';
        state.otpVerified = false;
      })

      // Send Reset OTP
      .addCase(sendResetOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendResetOtp.fulfilled, (state, action: PayloadAction<SendResetOtpResponse>) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(sendResetOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send reset OTP.';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<ResetPasswordResponse>) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset password.';
      })
      .addCase(deleteAccount.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null; // Clear user if needed
      state.token = null;
      removeUserInfo()
      removeToken()

    })
    .addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
     state.error = action.payload?.message || 'Account deletion failed';
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
