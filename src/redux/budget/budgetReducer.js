import { ADD_BUDGET } from "./budgetTypes";

const initialBudgetState = {
  budgets: [],
  total: 0,
};

const budgetReducer = (state = initialBudgetState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_BUDGET:
      const newBudgets = [...state.budgets];
      newBudgets.unshift(payload);
      return { ...state, newBudgets, total: state.total + payload.amount };

    default:
      break;
  }
};
export default budgetReducer;
