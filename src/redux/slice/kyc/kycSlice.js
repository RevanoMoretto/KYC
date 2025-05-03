import { createSlice } from "@reduxjs/toolkit";
import { fetchKycReducers } from "./reducer/fetch_detail_kyc";
import { saveKycReducers } from "./reducer/save_data_kyc";

const initialState = {
  fetchData: {
    data: null,
    loading: false,
    error: null
  },
  saveData: {
    saveSuccess: null,
    loading: false,
    error: null
  }
}

const kycSlice = createSlice({
    name: 'kyc',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      fetchKycReducers(builder)
      saveKycReducers(builder)
  },
});

export default kycSlice.reducer;