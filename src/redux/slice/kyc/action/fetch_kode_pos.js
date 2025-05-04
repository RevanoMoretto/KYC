import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchKodePos = createAsyncThunk(
  "kyc/fetchKodePos",
  async (value, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/param/getDataByZipcode", {
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
        // throw an error to rejected condition in fetchKodePos reducer
        return rejectWithValue(error.message || "Unknown error from action fetch kode pos kyc");
    }
  }
);