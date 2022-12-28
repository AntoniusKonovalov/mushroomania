import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserProps } from '../components/UploadProducts';
import { login, logoutUser, signUp, updateUser } from './authAPI';


export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface LoginStateProps {
  loggedIn: boolean;
  user: UserProps | null;
  status: Status;
}

export const initialState: LoginStateProps = {
  loggedIn: false,
  user: null,
  status: Status.IDLE,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add user
      .addCase(signUp.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const user = action.payload
        state.user = user
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })

      // Login User
      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const user = action.payload
        state.user = user
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })

      // Update User 
      .addCase(updateUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const user = action.payload
        state.user = user
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = Status.FAILED;
      })

      // Log Out User
      .addCase(logoutUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const user = action.payload
        state.user = user
      })
  }
})

export const { setLoggedIn } = loginSlice.actions;

export const loginSelector = (state: RootState) => state.login.loggedIn;

export const userSelector = (state: RootState) => state.login.user;
export const userStatus = (state: RootState) => state.login.status;

export default loginSlice.reducer