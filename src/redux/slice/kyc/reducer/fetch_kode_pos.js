import { fetchKodePos } from "../action/fetch_kode_pos";

export const fetchKodePosReducers = (builder) => {
  builder
    .addCase(fetchKodePos.pending, (state) => {
      state.kodePos.loading = true;
      state.kodePos.error = null;
    })
    .addCase(fetchKodePos.fulfilled, (state, action) => {
      state.kodePos.loading = false;
      state.kodePos.data = action.payload;
    })
    .addCase(fetchKodePos.rejected, (state, action) => {
      state.kodePos.loading = false;
      state.kodePos.error = action.payload || "An error occurred from fetching data kode pos kyc";
    });
};