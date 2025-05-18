import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
  isCancelApp: false
}

const cancelDataSlice = createSlice({
  name: 'cancel',
  initialState: initialStateData,
  reducers: {
    cancelData: (state, action) => {
      state.isCancelApp = !state.isCancelApp
    }
  }
});

export const { cancelData } = cancelDataSlice.actions;

export default cancelDataSlice.reducer;