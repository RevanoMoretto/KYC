import { createSlice } from "@reduxjs/toolkit";
import { 
  emergencyContact
} from "../../../constants/initialStateRedux";
import { handleEmergencyContact } from "./handlers/emergencyContactHandler";

const initialStateData = {
  formData: {
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

      if(subtab == "emergency_contact"){
        handleEmergencyContact(state, fields, prev)
      }

      state.formData.hasil_kyc = fields.hasil_kyc_input ?? prev.hasil_kyc
    }
  }
});

export const { saveData } = saveDataSlice.actions;

export default saveDataSlice.reducer;