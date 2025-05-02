import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk function to fetch image by order_id and doc_code
export const getDocImage = createAsyncThunk(
    'image/getDocImage',
    async ({ order_id, doc_code }, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/images/getImages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_id, doc_code }),
            });

            const result = await response.json();
            console.log("API response from backend:", result);

            if (result.status && result.data?.length > 0) {
                const image = result.data[0].doc_value;
                return image.startsWith("data:image")
                    ? image
                    : `data:image/jpeg;base64,${image}`;
            }

            return rejectWithValue('No image found');
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch image');
        }
    }
);

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDocImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDocImage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDocImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default imageSlice.reducer;
