import logo from "./logo.svg";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import Employees from "./components/Employees";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
