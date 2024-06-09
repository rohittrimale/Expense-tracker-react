// src/slices/expensesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (email, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      const response = await axios.get(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}.json`
      );
      const data = response.data;
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({ id: key, ...data[key] });
      }
      return loadedExpenses;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({ email, expenseData }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      const response = await axios.post(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}.json`,
        expenseData
      );
      return { id: response.data.name, ...expenseData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async ({ email, id }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      await axios.delete(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ email, id, updatedExpense }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    // console.log(userEmail);
    try {
      await axios.put(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`,
        updatedExpense
      );
      return { id, ...updatedExpense };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;

        const updatedExpenseIndex = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (updatedExpenseIndex !== -1) {
          state.expenses[updatedExpenseIndex] = action.payload;
        }
      });
  },
});

export default expensesSlice.reducer;
