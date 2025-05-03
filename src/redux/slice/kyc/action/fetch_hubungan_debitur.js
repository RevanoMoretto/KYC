import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRelationWithNasabah = createAsyncThunk(
  "kyc/fetchRelationWithNasabah",
  async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/param/getRelationWithNasabah", {
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
        // throw an error to rejected condition in fetchRelationWithNasabah reducer
        return rejectWithValue(error.message || "Unknown error from action fetch data relation with nasabah emergency contact");
    }
  }
);