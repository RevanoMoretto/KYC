import { createSlice } from "@reduxjs/toolkit";
import { fetchDocImageReducer } from "./reducer/fetch_doc_image";

const initialState = {
    fetchImage: {
        data: null,
        loading: false,
        error: null,
    }
}
const imageSlice = createSlice(
    {
        name: 'image',
        initialState: initialState,
        reducers: {},
        extraReducers: (builder) => {
            fetchDocImageReducer(builder)
        }
    }
)

export default imageSlice.reducer;