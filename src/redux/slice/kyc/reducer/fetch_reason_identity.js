import { fetchReasonIdentity } from '../action/fetch_reason_identity'
export const fetchReasonIdentityReducers = (builder) => {
    builder.addCase(fetchReasonIdentity.pending, (state) => {
        state.fetchReason.loading = true;
        state.fetchReason.error = null;
    }).addCase(fetchReasonIdentity.fulfilled, (state, action) => {
        state.fetchReason.loading = false;
        state.fetchReason.data = action.payload;
    }).addCase(fetchReasonIdentity.rejected, (state, action) => {
        state.fetchReason.loading = false;
        state.fetchReason.error = action.payload || "error occurred from fetching data reason identity"
    })
}