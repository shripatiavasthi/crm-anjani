import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import { doGet, doPost,doDel ,doPut} from "../helpers/api";
  import locations from "../helpers/locations";
  
  
  
  const initialState = {
    cityList: [],
    cityToEdit : null,
    error : null,
    status : null,
  };
  
  
  export const getCity = createAsyncThunk(
    "get/getCity",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI, locations.CITYS, {}, null)
    }
  );

  export const getCityById = createAsyncThunk(
    "get/getCityById",
    async (data, thunkAPI) => {
      let url = `${locations.CITYS}${data?.body?.id}`
      return await doGet(thunkAPI, url, {})
    }
  );

  export const patchCityById = createAsyncThunk(
    "get/getCityById",
    async (data, thunkAPI) => {
      let url = `${locations.CITYS}${data?.body?.id}`
      return await doPut(thunkAPI, url,{},data?.body)
    }
  );

  export const postCity = createAsyncThunk(
    "get/postCity",
    async (data, thunkAPI) => {
      return await doPost(thunkAPI, locations.NEWCITY,{} ,data?.body, null)
    }
  );
  
  export const deleteCity = createAsyncThunk(
    "get/deleteCity",
    async (data, thunkAPI) => {
      let url = `${locations.DELCITY}${data?.body?.id}`
      return await doDel(thunkAPI, url)
    }
  );
  
  const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
      setlocalStateforEditScreen(state, action) {
        state.genderDetails = action.payload
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getCity.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getCity.fulfilled, (state, action) => {
          state.cityList = action?.payload?.data?.City,
          state.status = "done";
        })
        .addCase(getCityById.fulfilled, (state, action) => {
          state.cityToEdit = action?.payload?.data?.City
        })
        .addCase(getCity.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
  
    },
  });
  
  export const { } = citySlice.actions;
  export default citySlice.reducer;
  
  
  
  