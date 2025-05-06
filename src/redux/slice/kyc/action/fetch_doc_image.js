import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDocImage = createAsyncThunk(
    'image/fetchDocImage',
    async ({ order_id, doc_code }, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/images/getImages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_id, doc_code }),
            });

            const result = await response.json();
            console.log("API response from backend:", result);

            if (result.status && result.data?.length > 0) {
                const image = result.data[0].doc_value;
                return image.startsWith("data:image")
                    ? image
                    : `data:image/jpeg;base64,${image}`;
            }

            return rejectWithValue('No image found');
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch image');
        }
    }
);
