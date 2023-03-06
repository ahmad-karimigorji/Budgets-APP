import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ExpenseForm.module.scss";
import { addExpense } from "../redux/expense/expenseActions";

const ExpenseForm = ({ setIsExpenseForm }) => {
  const dispatch = useDispatch();
  const { budgets } = useSelector((state) => state.budget);
  const [formValue, setFormValue] = useState({
    category: "",
    description: "",
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
    const data = {
      ...formValue,
      cost: parseInt(formValue.cost),
      category: parseInt(formValue.category),
      id: new Date().getTime(),
      creatAt: new Date().toISOString(),
    };
    dispatch(addExpense(data));
    setFormValue({ category: "", description: "", cost: "" });
    setIsExpenseForm(false)
  };
  if (!budgets.length) {
    return <h3 className={styles.warning}>Enter new budget !!</h3>;
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
            <option key={item.id} value={item.id}>
              {item.budgetName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={formValue.description}
          name="description"
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
