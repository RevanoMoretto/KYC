import { configureStore } from "@reduxjs/toolkit";
import kycReducer from './features/kycSlice';
import paramReducer from './features/paramSlice';
import imageReducer from './features/imageSlice';

export const store = configureStore({
    reducer: {
        kyc: kycReducer,
        param: paramReducer,
        image: imageReducer,
    }
})