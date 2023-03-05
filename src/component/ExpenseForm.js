import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ExpenseForm.module.scss";
import { addExpense } from "../redux/expense/expenseActions";

const ExpenseForm = ({ setIsExpenseForm }) => {
  const dispatch = useDispatch();
  const { budgets } = useSelector((state) => state.budget);
  const [formValue, setFormValue] = useState({
    category: "",
    Description: "",
    cost: "",
  });
  const [error, setError] = useState(false);
  const changeHandler = ({ target }) => {
    setError(false);

    const { name, value } = target;
    setFormValue({ ...formValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formValue.category.trim() || parseInt(formValue.cost.charAt()) < 1) {
      setError(true);
      return;
    }
    // console.log(formValue);
    dispatch(addExpense(formValue));
    setFormValue({ category: "", Description: "", cost: "" });
  };
  if(!budgets.length){
    return <h3 className={styles.warning}>Enter new budget !!</h3>
  }
  return (
    <form className={styles.expenseForm} onSubmit={submitHandler}>
      <div>
        <label>Expense Category</label>
        <select
          name="category"
          value={formValue.category}
          onChange={changeHandler}
        >
          <option value="">Select category</option>
          {budgets.map((item) => (
            <option value={item.budget}>{item.budget}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={formValue.Description}
          name="Description"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Expense Value</label>
        <input
          type="number"
          min={1}
          value={formValue.cost}
          name="cost"
          onChange={changeHandler}
        />
      </div>
      {error && <p className={styles.error}>Enter Valid Data !!</p>}
      <div className={styles.formBtnBox}>
        <button type="submit" className={styles.addBtn}>
          Add Expense
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setIsExpenseForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
