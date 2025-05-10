import { configureStore } from "@reduxjs/toolkit";
import kycReducer from '../slice/kyc/kycSlice';
import paramReducer from './features/paramSlice';
import imageReducer from './features/imageSlice';
import saveDataReducer from "../slice/save_data/saveDataSlice";

export const store = configureStore({
  reducer: {
    kyc: kycReducer,
    param: paramReducer,
    image: imageReducer,
    save: saveDataReducer
  }
})