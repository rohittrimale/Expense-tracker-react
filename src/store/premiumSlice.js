import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: {
    isDarkMode: false,
    isPremium: false,
  },

  reducers: {
    changeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    lightMode: (state) => {
      state.isDarkMode = false;
    },
    premiumHandler: (state) => {
      state.isPremium = true;
    },
    deactivatePremium: (state) => {
      state.isPremium = false;
    },
  },
});

export const { changeMode, premiumHandler, deactivatePremium, lightMode } =
  premiumSlice.actions;

export default premiumSlice.reducer;
