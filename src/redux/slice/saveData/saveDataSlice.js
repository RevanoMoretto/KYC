import { createSlice } from "@reduxjs/toolkit";
import {
  emergencyContact,
  InformasiNasabah
} from "../../../constants/initialStateRedux";
import { handleEmergencyContact } from "./handlers/emergencyContactHandler";
import { informasiNasabahHandler } from "./handlers/informasiNasabahHandler";

const initialStateData = {
  formData: {
    ...InformasiNasabah,
    ...emergencyContact,
    hasil_kyc: ""
  },
}

const saveDataSlice = createSlice({
  name: 'save',
  initialState: initialStateData,
  reducers: {
    saveData: (state, action) => {
      const { subtab = "", fields } = action.payload

      const prev = state.formData
      if (subtab == "informasi_nasabah") {
        informasiNasabahHandler(state, fields, prev)
      }

      if (subtab == "emergency_contact") {
        handleEmergencyContact(state, fields, prev)
      }

      state.formData.hasil_kyc = fields.hasil_kyc_input ?? prev.hasil_kyc
    }
  }
});

export const { saveData } = saveDataSlice.actions;

export default saveDataSlice.reducer;