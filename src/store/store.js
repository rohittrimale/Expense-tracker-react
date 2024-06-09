// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import premiumReducer from "./premiumSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    premium: premiumReducer,
  },
});

export default store;
