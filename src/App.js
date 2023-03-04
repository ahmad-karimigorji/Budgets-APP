import "./App.scss";
import BudgetList from "./component/BudgetList";
import OverViewComponent from "./component/OverViewComponent";

function App() {
  return (
    <div className="container">
      <OverViewComponent />
      <BudgetList/>
    </div>
  );
}

export default App;
