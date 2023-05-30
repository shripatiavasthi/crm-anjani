import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { doGet, doPost } from "../helpers/api";
import locations from "../helpers/locations";



const initialState = {
  LoginDetails: {},
  error : null,
  status : null,
};


export const userlogin = createAsyncThunk(
  "post/userlogin",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, locations.LOGIN, {}, data?.body, null)
  }
);


const loginSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setlocalStateforEditScreen(state, action) {
      state.genderDetails = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userlogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.LoginDetails = action?.payload?.data?.value
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const { } = loginSlice.actions;
export default loginSlice.reducer;



