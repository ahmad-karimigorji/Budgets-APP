import {
  ADD_EXPENSE,
  DELETE_ALL_EXPENSES_OF_BUDGET,
  DELETE_EXPENSE,
} from "./expenseTypes";

export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};
export const deleteExpense = (expense) => {
  return {
    type: DELETE_EXPENSE,
    payload: expense,
  };
};
export const deleteAllExpensesOfBudget = (categoryId) => {
  return {
    type: DELETE_ALL_EXPENSES_OF_BUDGET,
    payload: categoryId,
  };
};
