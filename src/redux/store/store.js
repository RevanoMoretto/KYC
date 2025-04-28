import { configureStore } from "@reduxjs/toolkit";
import kycReducer from './features/kycSlice';

export const store = configureStore({
    reducer: {
        kyc: kycReducer,
    }
})