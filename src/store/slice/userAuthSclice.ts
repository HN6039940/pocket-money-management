import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserAuthState = {
  isLogin: boolean;
  name: string;
  email: string;
  id: string;
};

const initialState: UserAuthState = {
  name: "",
  email: "",
  isLogin: false,
  id: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserAuthState>) => {
      state.isLogin = action.payload.isLogin;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export default userAuthSlice.reducer;
export const { setUserInfo, setIsLogin } = userAuthSlice.actions;
