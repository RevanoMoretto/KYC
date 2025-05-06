import { createAsyncThunk } from '@reduxjs/toolkit'
import React from 'react'

export const fetchReasonIdentity = createAsyncThunk("kyc/fetchReasonIdentity", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/param/getAlasan", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "error from action fetch reason");
    }
}
)
