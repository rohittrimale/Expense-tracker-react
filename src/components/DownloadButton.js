import React from "react";
import { useSelector } from "react-redux";

const DownloadButton = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Price,Description,Category\n" +
      expenses
        .map(
          (exp) =>
            `${exp.expenseName},${exp.expensePrice},${exp.expenseDescription},${exp.expenseCategory}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button
      type="button"
      onClick={handleDownloadCSV}
      className="relative inline-block text-lg group"
    >
      <span className="relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-3 py-2 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">Download Csv File</span>
      </span>
      <span
        className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-lg"
      ></span>
    </button>
  );
};

export default DownloadButton;
