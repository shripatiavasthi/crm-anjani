import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import { doGet, doPost,doDel ,doPut} from "../helpers/api";
  import locations from "../helpers/locations";
  
  
  
  const initialState = {
    TestParam: [],
    cityToEdit : null,
    error : null,
    status : null,
  };
  
  
  export const getTest = createAsyncThunk(
    "get/getTest",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI, locations.GETTEST, {}, null)
    }
  );

//   export const getTestyById = createAsyncThunk(
//     "get/getTestyById",
//     async (data, thunkAPI) => {
//       let url = `${locations.CITYS}${data?.body?.id}`
//       return await doGet(thunkAPI, url, {})
//     }
//   );

//   export const patchTestById = createAsyncThunk(
//     "get/patchTestById",
//     async (data, thunkAPI) => {
//       let url = `${locations.CITYS}${data?.body?.id}`
//       return await doPut(thunkAPI, url,{},data?.body)
//     }
//   );

  export const postTestParameter = createAsyncThunk(
    "get/postTest",
    async (data, thunkAPI) => {
      return await doPost(thunkAPI, locations.NEWTESTPARAM,{} ,data?.body, null)
    }
  );
  
//   export const deleteTest = createAsyncThunk(
//     "get/deleteTest",
//     async (data, thunkAPI) => {
//       let url = `${locations.DELCITY}${data?.body?.id}`
//       return await doDel(thunkAPI, url)
//     }
//   );
  
  const testSlice = createSlice({
    name: "city",
    initialState,
    reducers: {
      setlocalStateforEditScreen(state, action) {
        state.genderDetails = action.payload
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getTest.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getTest.fulfilled, (state, action) => {
          state.TestParam = action?.payload?.data?.test,
          state.status = "done";
        })
  
    },
  });
  
  export const { } = testSlice.actions;
  export default testSlice.reducer;
  
  
  
  