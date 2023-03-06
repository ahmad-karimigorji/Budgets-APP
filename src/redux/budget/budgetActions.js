import { ADD_BUDGET, DELETE_BUDGET } from "./budgetTypes";

export const addBudget = (budget) => {
  return {
    type: ADD_BUDGET,
    payload: budget,
  };
};
export const deleteBudget = (budget) => {
  return {
    type: DELETE_BUDGET,
    payload: budget,
  };
};