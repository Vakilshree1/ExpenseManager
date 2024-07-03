import './App.css'
import {SignUp} from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard';
import {AddExpense} from './components/AddExpense';

function App() {
 
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<SignUp/>} />
          <Route exact path="/signin" element={<Login/>} />
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/add" element={<AddExpense/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
