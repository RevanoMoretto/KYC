import { fetchJenisTempatKerja } from "../action/fetch_jenis_tempat_kerja";

export const fetchJenisTempatKerjaReducer = (builder) => {
  builder
    .addCase(fetchJenisTempatKerja.pending, (state) => {
      state.jenisTempatKerja.loading = true;
      state.jenisTempatKerja.error = null;
    })
    .addCase(fetchJenisTempatKerja.fulfilled, (state, action) => {
      state.jenisTempatKerja.loading = false;
      state.jenisTempatKerja.data = action.payload || [];
    })
    .addCase(fetchJenisTempatKerja.rejected, (state, action) => {
      state.jenisTempatKerja.loading = false;
      state.jenisTempatKerja.error = action.payload || "An error occurred from fetching data jenis tempat kerja kyc";
    });
};