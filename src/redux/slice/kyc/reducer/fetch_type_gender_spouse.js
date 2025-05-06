import { fetchTypeSpouse } from "../action/fetch_type_gender_spouse";


export const fetchTypeSpouseReducers = (builder) => {
    builder.addCase(fetchTypeSpouse.pending, (state) => {
        state.typeIdentitySpouse.loading = true;
        state.typeIdentitySpouse.error = null;
    }).addCase(fetchTypeSpouse.fulfilled, (state, action) => {
        state.typeIdentitySpouse.loading = false;
        state.typeIdentitySpouse.data = action.payload;
        console.log('Data received:', action.payload);
    }).addCase(fetchTypeSpouse.rejected, (state, action) => {
        state.typeIdentitySpouse.loading = false;
        state.typeIdentitySpouse.error = action.payload || "An error occurred from fetching data spouse type identity"
    })

}