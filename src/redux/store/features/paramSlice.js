import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Thunk for the GET request
export const paramReasonCantShowIdentity = createAsyncThunk(
    'param/paramReasonCantShowIdentity',
    async () => {
        try {
            const response = await fetch('/api/param/getAlasan', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message_error || 'Failed to fetch param alasan tidak bisa menunjukan identitas asli');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error occurred while fetching master alasan:", error);
            return { error: error.message || 'Failed to fetch param alasan tidak bisa menunjukan identitas asli' };
        }
    }
);

export const paramJenisIdentitasPasangan = createAsyncThunk(
    'param/paramJenisIdentitasPasangan', async () => {
        try {
            const response = await fetch('/api/param/getJenisIdentitasPasangan', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message_error || 'Failed to fetch param jenis identitas pasangan');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error occurred while fetching Master Jenis Identitas Pasangan:", error);
            return { error: error.message || 'Failed to fetch param jenis identitas pasangan' };
        }
    }
)

// Redux Slice
const paramSlice = createSlice({
    name: 'param',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paramReasonCantShowIdentity.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset error on new request
            })
            .addCase(paramReasonCantShowIdentity.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;  // Reset error on successful fetch
            })
            .addCase(paramReasonCantShowIdentity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch param alasan tidak bisa menunjukan identitas asli';
            });
    }
});

export default paramSlice.reducer;
