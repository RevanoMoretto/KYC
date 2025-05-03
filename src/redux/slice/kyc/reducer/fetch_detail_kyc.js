import { fetchDetailKyc } from "../action/fetch_detail_kyc";

export const fetchKycReducers = (builder) => {
  builder
    .addCase(fetchDetailKyc.pending, (state) => {
      state.fetchData.loading = true;
      state.fetchData.error = null;
    })
    .addCase(fetchDetailKyc.fulfilled, (state, action) => {
      state.fetchData.loading = false;
      state.fetchData.data = action.payload;
    })
    .addCase(fetchDetailKyc.rejected, (state, action) => {
      state.fetchData.loading = false;
      state.fetchData.error = action.payload || "An error occurred from fetching data detail kyc";
    });
};