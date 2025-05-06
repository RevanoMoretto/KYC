import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTypeSpouse = createAsyncThunk("kyc/fetchTypeSpouse", async (
    _, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/param/getJenisIdentitasPasangan", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue;
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message || "error from action fetch type spouse")
    }
})