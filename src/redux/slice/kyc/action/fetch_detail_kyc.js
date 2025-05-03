import { createAsyncThunk } from "@reduxjs/toolkit";
import KycDetailStorage from "../../../../utils/kyc_detail_storage";

export const fetchDetailKyc = createAsyncThunk(
  "kyc/fetchDetailKyc",
  async (no_order, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/detail/getDetailKyc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ no_order }),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data)
        }

        // save to local storage as 'kyc_detail'
        KycDetailStorage.value = data

        return data;
    } catch (error) {
        // clear kyc_detail value if have an error
        KycDetailStorage.value = {}

        // throw an error to rejected condition in fetchDetailKyc reducer
        return rejectWithValue(error.message || "Unknown error from action fetch data kyc");
    }
  }
);