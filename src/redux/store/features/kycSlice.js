import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDetailKyc from "../../../pages/api/detail/getDetailKyc";

// fetch data from getDetail
export const fetchDetailKyc = createAsyncThunk(
    "kyc/fetchDetailKyc",
    async (no_order, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/detail/getDetailKyc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ no_order }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = typeof errorResponse === 'object'
                    ? errorResponse.message_error || JSON.stringify(errorResponse)
                    : errorResponse;
                throw new Error(errorMessage || 'Failed to fetch KYC data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error occurred while fetching KYC data:", error.message, error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);



// trigger button save
export const saveKyc = createAsyncThunk(
    'kyc/saveKyc',
    async (payload, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8092/saveKyc', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to save KYC');
            const result = await response.json();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const kycSlice = createSlice({
    name: 'kyc',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchDetailKyc.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDetailKyc.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDetailKyc.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // SAVE
            .addCase(saveKyc.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveSuccess = null;
            })
            .addCase(saveKyc.fulfilled, (state, action) => {
                state.loading = false;
                state.saveSuccess = true;
            })
            .addCase(saveKyc.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.saveSuccess = false;
            });
    },
});

export default kycSlice.reducer;