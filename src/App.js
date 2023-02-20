// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { Page404 } from "./components/Page404/Page404";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/Toast/Toast";

function App() {
  return (
    <div className="App">
        <Toast/>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="add-product" element={<AddProduct />} />
          </Route>
        <Route path="/*" element={<Page404 />} />      
      </Routes>
    </div>
  );
}

export default App;
