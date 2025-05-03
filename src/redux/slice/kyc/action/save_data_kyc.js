import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveKyc = createAsyncThunk(
  "kyc/saveKyc",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8092/saveKyc', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result)
      }

      return result;
    } catch (error) {
      // throw an error to rejected condition in saveKyc reducer
      return rejectWithValue(error.message || "Unknown error from action save data kyc");
    }
  }
);