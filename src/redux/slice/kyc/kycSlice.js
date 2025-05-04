import { createSlice } from "@reduxjs/toolkit";
import { fetchKycReducers } from "./reducer/fetch_detail_kyc";
import { saveKycReducers } from "./reducer/save_data_kyc";
import { fetchRelationWithNasabahReducers } from "./reducer/fetch_hubungan_debitur";
import { fetchKodePosReducers } from "./reducer/fetch_kode_pos";

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
  },
  relationWithNasabah: {
    data: null,
    loading: false,
    error: null
  },
  kodePos: {
    data: null,
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
      fetchRelationWithNasabahReducers(builder)
      fetchKodePosReducers(builder)
  },
});

export default kycSlice.reducer;