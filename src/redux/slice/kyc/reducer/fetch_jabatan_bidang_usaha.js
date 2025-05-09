import { fetchJabatanBidangUsaha } from "../action/fetch_jabatan_bidang_usaha";

export const fetchJabatanBidangUsahaReducer = (builder) => {
  builder
    .addCase(fetchJabatanBidangUsaha.pending, (state) => {
      state.jabatanBidangUsaha.loading = true;
      state.jabatanBidangUsaha.error = null;
    })
    .addCase(fetchJabatanBidangUsaha.fulfilled, (state, action) => {
      state.jabatanBidangUsaha.loading = false;
      state.jabatanBidangUsaha.data = action.payload || [];
    })
    .addCase(fetchJabatanBidangUsaha.rejected, (state, action) => {
      state.jabatanBidangUsaha.loading = false;
      state.jabatanBidangUsaha.error = action.payload || "An error occurred from fetching data jabatan dan bidang usaha kyc";
    });
};