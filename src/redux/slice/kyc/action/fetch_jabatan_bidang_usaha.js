import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJabatanBidangUsaha = createAsyncThunk(
  "kyc/fetchJabatanBidangUsaha",
  async (value, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/param/getJabatanBidangUsaha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value }),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data)
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Unknown error from action fetch jabatan dan bidang usaha kyc");
    }
  }
);