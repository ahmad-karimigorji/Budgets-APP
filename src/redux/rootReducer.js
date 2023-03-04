import {combineReducers} from "redux";
import budgetReducer from "./budget/budgetReducer";
import expenseReducer from "./expense/expenseReducer";

const combineReducer = combineReducers;

const reducer = combineReducer({
  budger: budgetReducer,
  expense: expenseReducer,
});

export default reducer;
