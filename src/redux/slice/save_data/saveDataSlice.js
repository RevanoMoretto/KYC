import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    emergency_contact: {
      nama_emergency_contact: "",
      nohp1_emergency_contact: "",
      nohp2_emergency_contact: "",
      alamat_emergency_contact: "",
      rt_emergency_contact: "",
      rw_emergency_contact: "",
      hubungan_emergency_contact_code: "",
      hubungan_emergency_contact_desc: "",
      kodepos_emergency_contact_code: "",
      kelurahan_emergency_contact_code: "",
      kelurahan_emergency_contact_desc: "",
      kecamatan_emergency_contact_code: "",
      kecamatan_emergency_contact_desc: "",
      kabkota_emergency_contact_code: "",
      kabkota_emergency_contact_desc: "",
      provinsi_emergency_contact_code: "",
      provinsi_emergency_contact_desc: ""
    },
    hasil_kyc: ""
  },
}

const saveDataSlice = createSlice({
  name: 'save',
  initialState: initialState,
  reducers: {
    saveData: (state, action) => {
      const { subtab, fields } = action.payload

      if(subtab == "emergency_contact"){
        const { 
          nama_ec,
          nomor_hp_1_ec,
          nomor_hp_2_ec,
          alamat_ec,
          rt_ec,
          rw_ec,
          hubungan_ec_code,
          hubungan_ec_desc,
          kodepos_ec_code,
          kelurahan_ec_code,
          kelurahan_ec_desc,
          kecamatan_ec_code,
          kecamatan_ec_desc,
          kabkota_ec_code,
          kabkota_ec_desc,
          provinsi_ec_code,
          provinsi_ec_desc
        } = fields || {}

        const prev = state.formData.emergency_contact

        state.formData.emergency_contact.nama_emergency_contact = nama_ec ?? prev.nama_emergency_contact
        state.formData.emergency_contact.nohp1_emergency_contact = nomor_hp_1_ec ?? prev.nohp1_emergency_contact
        state.formData.emergency_contact.nohp2_emergency_contact = nomor_hp_2_ec ?? prev.nohp2_emergency_contact
        state.formData.emergency_contact.alamat_emergency_contact = alamat_ec ?? prev.alamat_emergency_contact
        state.formData.emergency_contact.rt_emergency_contact = rt_ec ?? prev.rt_emergency_contact
        state.formData.emergency_contact.rw_emergency_contact = rw_ec ?? prev.rw_emergency_contact
        state.formData.emergency_contact.hubungan_emergency_contact_code = hubungan_ec_code ?? prev.hubungan_emergency_contact_code
        state.formData.emergency_contact.hubungan_emergency_contact_desc = hubungan_ec_desc ?? prev.hubungan_emergency_contact_desc
        state.formData.emergency_contact.kodepos_emergency_contact_code = kodepos_ec_code ?? prev.kodepos_emergency_contact_code
        state.formData.emergency_contact.kelurahan_emergency_contact_code = kelurahan_ec_code ?? prev.kelurahan_emergency_contact_code
        state.formData.emergency_contact.kelurahan_emergency_contact_desc = kelurahan_ec_desc ?? prev.kelurahan_emergency_contact_desc
        state.formData.emergency_contact.kecamatan_emergency_contact_code = kecamatan_ec_code ?? prev.kecamatan_emergency_contact_code
        state.formData.emergency_contact.kecamatan_emergency_contact_desc = kecamatan_ec_desc ?? prev.kecamatan_emergency_contact_desc
        state.formData.emergency_contact.kabkota_emergency_contact_code = kabkota_ec_code ?? prev.kabkota_emergency_contact_code
        state.formData.emergency_contact.kabkota_emergency_contact_desc = kabkota_ec_desc ?? prev.kabkota_emergency_contact_desc
        state.formData.emergency_contact.provinsi_emergency_contact_code = provinsi_ec_code ?? prev.provinsi_emergency_contact_code
        state.formData.emergency_contact.provinsi_emergency_contact_desc = provinsi_ec_desc ?? prev.provinsi_emergency_contact_desc
      }

      state.formData.hasil_kyc = fields.hasil_kyc_input
    }
  }
});

export const { saveData } = saveDataSlice.actions;

export default saveDataSlice.reducer;