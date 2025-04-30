import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    reasonCantShowIdentity: { data: [], loading: false },
    spouseIdentity: { data: [], loading: false },
}

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
        reasonCantShowIdentity: {
            data: null,
            loading: false,
            error: null,
        },
        spouseIdentity: {
            data: [],
            loading: false,
            error: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paramReasonCantShowIdentity.pending, (state) => {
                state.reasonCantShowIdentity.loading = true;
                state.reasonCantShowIdentity.error = null;
            })
            .addCase(paramReasonCantShowIdentity.fulfilled, (state, action) => {
                state.reasonCantShowIdentity.loading = false;
                state.reasonCantShowIdentity.data = action.payload;
                state.reasonCantShowIdentity.error = null;
            })
            .addCase(paramReasonCantShowIdentity.rejected, (state, action) => {
                state.reasonCantShowIdentity.loading = false;
                state.reasonCantShowIdentity.error = action.error.message || 'Failed to fetch param alasan tidak bisa menunjukan identitas asli';
            })
            .addCase(paramJenisIdentitasPasangan.pending, (state) => {
                state.spouseIdentity.loading = true;
                state.spouseIdentity.error = null;
            })
            .addCase(paramJenisIdentitasPasangan.fulfilled, (state, action) => {
                state.spouseIdentity.loading = false;
                state.spouseIdentity.data = action.payload;
            })
            .addCase(paramJenisIdentitasPasangan.rejected, (state, action) => {
                state.spouseIdentity.loading = false;
                state.spouseIdentity.error = action.error.message;
            });;
    }
});

export default paramSlice.reducer;
