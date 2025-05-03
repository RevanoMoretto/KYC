import { fetchRelationWithNasabah } from "../action/fetch_hubungan_debitur";

export const fetchRelationWithNasabahReducers = (builder) => {
  builder
    .addCase(fetchRelationWithNasabah.pending, (state) => {
      state.relationWithNasabah.loading = true;
      state.relationWithNasabah.error = null;
    })
    .addCase(fetchRelationWithNasabah.fulfilled, (state, action) => {
      state.relationWithNasabah.loading = false;
      state.relationWithNasabah.data = action.payload.data.map((e) => {
        return {
          value: e.rel_nasabah_code,
          label: e.rel_nasabah_desc
        }
      });
    })
    .addCase(fetchRelationWithNasabah.rejected, (state, action) => {
      state.relationWithNasabah.loading = false;
      state.relationWithNasabah.error = action.payload || "An error occurred from fetching data relation with nasabah emergency contact";
    });
};