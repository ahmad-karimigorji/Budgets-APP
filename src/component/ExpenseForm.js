import styles from "./ExpenseForm.module.scss";

const ExpenseForm = ({setIsExpenseForm}) => {
  return (
    <form className={styles.expenseForm}>
      <div>
        <label>Expense Category</label>
        <select>
          <option value="">Select category</option>
        </select>
      </div>
      <div>
        <label>Budget Value</label>
        <input type="number" min={1} />
      </div>
      <div className={styles.formBtnBox}>
        <button className={styles.addBtn}>Add Budget</button>
        <button className={styles.cancelBtn} onClick={() => setIsExpenseForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
