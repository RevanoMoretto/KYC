import { fetchPekerjaan } from "../action/fetch_pekerjaan";
export const fetchPekerjaanReducer = (builder) =>{
    builder
    .addCase(fetchPekerjaan.pending, (state) => {
        state.pekerjaanNasabah.loading = true;
        state.pekerjaanNasabah.error = null;
    })
    .addCase(fetchPekerjaan.fulfilled, (state, action) => {
        state.pekerjaanNasabah.loading = false;
        state.pekerjaanNasabah.data = action.payload || [];
    })
    .addCase(fetchPekerjaan.rejected, (state, action) => {
        state.pekerjaanNasabah.loading = false;
        state.pekerjaanNasabah.error = action.payload || "error occurred from fetching data debitur job"
    })
}