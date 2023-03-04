import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import styles from "./OverViewComponent.module.scss";

const OverViewComponent = () => {
    const [isBudgetForm, setIsBudgetForm] =useState(false)
    const [isExpenseForm, setIsExpenseForm] =useState(false)

    const budgetFormHandler = () => {
        setIsBudgetForm(true)
        setIsExpenseForm(false)
    }
    const expenseFormHandler = () => {
        setIsExpenseForm(true)
        setIsBudgetForm(false)
    }
  return (
    <div className={styles.overView}>
      <div className={styles.overViewHeader}>
        <h2>Budgets</h2>
        <div>
          <button className={styles.budgetBtn} onClick={budgetFormHandler}>Add Budget</button>
          <button className={styles.expenseBtn} onClick={expenseFormHandler}>Add Expense</button>
        </div>
      </div>
      {isBudgetForm && <BudgetForm setIsBudgetForm={setIsBudgetForm}/>}
      {isExpenseForm && <ExpenseForm setIsExpenseForm={setIsExpenseForm}/>}
    </div>
  );
};

export default OverViewComponent;

const BudgetForm = ({setIsBudgetForm}) => {
  return (
    <form className={styles.budgetForm}>
      <div>
        <label>Budget Name</label>
        <input type="text" />
      </div>
      <div>
        <label>Budget Value</label>
        <input type="number" min={1} />
      </div>
      <div className={styles.formBtnBox}>
        <button className={styles.addBtn}>Add Budget</button>
        <button className={styles.cancelBtn} onClick={() => setIsBudgetForm(false)}>Cancel</button>
      </div>
    </form>
  );
};
