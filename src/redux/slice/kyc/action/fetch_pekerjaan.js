import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPekerjaan = createAsyncThunk(
  "kyc/fetchPekerjaan",
  async (value, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/param/getPekerjaanNasabah", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ value }),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data)
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Unknown error from action fetch pekerjaan kyc");
    }
  }
);