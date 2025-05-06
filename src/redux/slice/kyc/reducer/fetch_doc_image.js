import { fetchDocImage } from "../action/fetch_doc_image";

export const fetchDocImageReducer = (builder) => {
    builder
        .addCase(fetchDocImage.pending, (state) => {
            state.fetchData.loading = true;
            state.fetchData.error = null;
        })
        .addCase(fetchDocImage.fulfilled, (state, action) => {
            state.fetchData.loading = false;
            state.fetchData.data = action.payload;
        })
        .addCase(fetchDocImage.rejected, (state, action) => {
            state.fetchData.loading = false;
            state.fetchData.error = action.payload || "An error occurred from fetching image doc";
        });
};