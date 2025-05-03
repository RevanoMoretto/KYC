import { saveKyc } from "../action/save_data_kyc";

export const saveKycReducers = (builder) => {
  builder
    .addCase(saveKyc.pending, (state) => {
      state.saveData.loading = true;
      state.saveData.error = null;
      state.saveData.saveSuccess = null;
    })
    .addCase(saveKyc.fulfilled, (state) => {
      state.saveData.loading = false;
      state.saveData.saveSuccess = true;
    })
    .addCase(saveKyc.rejected, (state, action) => {
      state.saveData.loading = false;
      state.saveData.error = action.payload || "An error occurred from saving data kyc";
      state.saveData.saveSuccess = false;
    });
};