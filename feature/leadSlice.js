import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import { doGet, doPost,doPut,doDel } from "../helpers/api";
  import locations from "../helpers/locations";
  
  
  
  const initialState = {
    LeadDetails: [],
    LeadStatus :null,
    LeadStatusId : null,
    LeadById : null,
    error : null,
    status : null,
  };
  
  
  export const getleads = createAsyncThunk(
    "get/getleads",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI, locations.LEADS, {}, null)
    }
  );
  
    
  export const getstatusleads = createAsyncThunk(
    "get/getstatusleads",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI, locations.LEADSTATUS, {}, null)
    }
  );

  export const getstatusleadsbyId = createAsyncThunk(
    "get/getstatusleadsbyId",
    async (data, thunkAPI) => {
      let url = `${locations.LEADSTATUS}${data?.body?.id}`
      return await doGet(thunkAPI, url, {})
    }
  );

  export const getleadsbyId = createAsyncThunk(
    "get/getleadsbyId",
    async (data, thunkAPI) => {
      let url = `${locations.LEADS}${data?.body?.id}`
      return await doGet(thunkAPI, url, {})
    }
  );

  export const patchleadsbyId = createAsyncThunk(
    "get/patchleadsbyId",
    async (data, thunkAPI) => {
      let url = `${locations.PUTLEAD}${data?.id}`
      return await doPut(thunkAPI, url, {}, data?.body)
    }
  );

  export const patchleadStatusbyId = createAsyncThunk(
    "get/patchleadStatusbyId",
    async (data, thunkAPI) => {
      let url = `${locations.ADMINLEADSTATUS}${data?.id}`
      return await doPut(thunkAPI, url, {}, data?.body)
    }
  );

  export const delleadStatusbyId = createAsyncThunk(
    "get/delleadStatusbyId",
    async (data, thunkAPI) => {
      let url = `${locations.ADMINLEADSTATUS}${data?.body?.id}`
      return await doDel(thunkAPI, url)
    }
  );

  export const poststatusleads = createAsyncThunk(
    "get/poststatusleads",
    async (data, thunkAPI) => {
      return await doPost(thunkAPI, locations.NEWLEADSTATUS,{} ,data?.body, null)
    }
  );

  export const postleads = createAsyncThunk(
    "get/postleads",
    async (data, thunkAPI) => {
      return await doPost(thunkAPI, locations.NEWLEAD,{} ,data?.body, null)
    }
  );

  export const deleteleads = createAsyncThunk(
    "get/deleteleads",
    async (data, thunkAPI) => {
      let url = `${locations.DELLEAD}${data?.body?.id}`
      return await doDel(thunkAPI, url)
    }
  );
  
  const leadSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setlocalStateforEditScreen(state, action) {
        state.genderDetails = action.payload
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getleads.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getleads.fulfilled, (state, action) => {
          state.LeadDetails = action?.payload?.data?.lead
        })
        .addCase(getstatusleads.fulfilled, (state, action) => {
          state.LeadStatus = action?.payload?.data?.leadStatus
        })
        .addCase(getleadsbyId.fulfilled, (state, action) => {
          state.LeadById = action?.payload?.data?.lead
        })
        .addCase(getstatusleadsbyId.fulfilled, (state, action) => {
          state.LeadStatusId = action?.payload?.data?.leadStatus
        })
        .addCase(getleads.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
  
    },
  });
  
  export const { } = leadSlice.actions;
  export default leadSlice.reducer;
  
  
  
  