import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "../store/expenseSlice";
import Loader from "./Loader";

const ExpenseCart = ({ expense, userEmail }) => {
  const { expenseName, expensePrice, expenseDescription, expenseCategory } =
    expense;
  const { loading } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleDelete = () => {
    dispatch(deleteExpense({ email: userEmail, id: expense.id }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updateExpense({
        email: userEmail,
        id: editedExpense.id,
        updatedExpense: editedExpense,
      })
    );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (
    !expenseName ||
    !expensePrice ||
    !expenseDescription ||
    !expenseCategory
  ) {
    return null; // If any expense detail is empty, don't render the component
  }

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="">
      {isEditing ? (
        <div className="border border-white grid grid-cols-6 justify-center bg-gray-700 px-3 items-center font-bold py-2 text-white">
          <div>
            <input
              type="text"
              name="expenseName"
              value={editedExpense.expenseName}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="expenseDescription"
              value={editedExpense.expenseDescription}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="expenseCategory"
              value={editedExpense.expenseCategory}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <MdCurrencyRupee />
            <input
              type="text"
              name="expensePrice"
              value={editedExpense.expensePrice}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="border border-black grid grid-cols-6 justify-center bg-slate-200 px-3 items-center font-bold py-2 text-black">
          <div>{expenseName}</div>
          <div>{expenseDescription}</div>
          <div>{expenseCategory}</div>
          <div className="flex items-center">
            <MdCurrencyRupee />
            <div>{expensePrice}</div>
          </div>
          <button
            type="button"
            onClick={handleEdit}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-white bg-gradient-to-r py-1.5 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 text-center me-2 mb-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseCart;
