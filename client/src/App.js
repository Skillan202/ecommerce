import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Regsiter from "./components/Regsiter";
import Productscreen from "./components/Productscreen";
import Orderscreen from "./components/Orderscreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Mail from "./components/Mail";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/mail" element={<Mail/>}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Regsiter />}></Route>
          <Route path="/" element={<Productscreen />}></Route>
          <Route path="/orders" element={<Orderscreen />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
