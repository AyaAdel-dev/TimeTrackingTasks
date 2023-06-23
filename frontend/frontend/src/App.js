import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
// import NavBar from './Component/NavBar';
import Register from './Component/Register';
import Home from'./Component/Home'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        {/* <Route path="/navbar" element={<NavBar />}>
        </Route> */}
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/home/:id" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
