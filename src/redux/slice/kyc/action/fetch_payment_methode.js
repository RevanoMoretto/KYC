import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPaymentMethode = createAsyncThunk(
  "kyc/fetchPaymentMethode",
  async ({ channel_code, fin_type_code, sumber_nasabah_code }, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/param/getPaymentMethode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channel_code, fin_type_code, sumber_nasabah_code }),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data)
        }

        return data;
    } catch (error) {
        // throw an error to rejected condition in fetchPaymentMethode reducer
        return rejectWithValue(error.message || "Unknown error from action fetch payment methode");
    }
  }
);