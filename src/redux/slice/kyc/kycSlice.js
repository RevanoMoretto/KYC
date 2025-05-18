import { createSlice } from "@reduxjs/toolkit";
import { fetchKycReducers } from "./reducer/fetch_detail_kyc";
import { saveKycReducers } from "./reducer/save_data_kyc";
import { fetchRelationWithNasabahReducers } from "./reducer/fetch_hubungan_debitur";
import { fetchKodePosReducers } from "./reducer/fetch_kode_pos";
import { fetchReasonIdentityReducers } from "./reducer/fetch_reason_identity";
import { fetchTypeSpouseReducers } from "./reducer/fetch_type_gender_spouse";
import { fetchPekerjaanReducer } from "./reducer/fetch_pekerjaan";
import { fetchJabatanBidangUsahaReducer } from "./reducer/fetch_jabatan_bidang_usaha";
import { fetchJenisTempatKerjaReducer } from "./reducer/fetch_jenis_tempat_kerja";
import { fetchPaymentMethodeReducers } from "./reducer/fetch_payment_methode";

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
  },
  fetchReason: {
    data: null,
    loading: false,
    error: null,
  },
  typeIdentitySpouse: {
    data: [],
    loading: false,
    error: null,
  },
  pekerjaanNasabah: {
    data: null,
    loading: false,
    error: null,
  },
  jabatanBidangUsaha: {
    data: null,
    loading: false,
    error: null,
  },
  jenisTempatKerja: {
    data: null,
    loading: false,
    error: null,
  },
  paymentMethode: {
    data: null,
    loading: false,
    error: null,
  },
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
    fetchReasonIdentityReducers(builder)
    fetchTypeSpouseReducers(builder)
    fetchPekerjaanReducer(builder)
    fetchJabatanBidangUsahaReducer(builder)
    fetchJenisTempatKerjaReducer(builder)
    fetchPaymentMethodeReducers(builder)
  },
});

export default kycSlice.reducer;