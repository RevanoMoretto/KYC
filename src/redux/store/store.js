import { configureStore } from "@reduxjs/toolkit";
import kycReducer from '../slice/kyc/kycSlice';
import paramReducer from './features/paramSlice';
import imageReducer from './features/imageSlice';
import saveDataReducer from "../slice/saveData/saveDataSlice";
import cancelDataReducer from "../slice/cancelData/cancelDataSlice";

export const store = configureStore({
  reducer: {
    kyc: kycReducer,
    param: paramReducer,
    image: imageReducer,
    save: saveDataReducer,
    cancel: cancelDataReducer
  }
})