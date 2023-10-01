
import './App.css';
import AddExpense from './components/Expense/addExpense';
import AllExpense from './components/Expense/allExpense';
import Login from './components/login/login';
import SignUp from './components/signup/signup';

function App() {
  return (
    <div className="App">
      <Login></Login>
      <hr></hr>
      <SignUp></SignUp>
      <hr></hr>
      <AddExpense></AddExpense>
      <hr></hr>
      <AllExpense></AllExpense>
    </div>
  );
}

export default App;
