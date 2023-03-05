import { ADD_BUDGET } from "./budgetTypes";

export const addBudget = (budget) => {
  return {
    type: ADD_BUDGET,
    payload: budget,
  };
};
