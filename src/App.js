// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home/Home';
import { AddProduct } from './components/AddProduct/AddProduct';
import { Page404 } from './components/Page404/Page404';

function App() {

  
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} /> 
         <Route path="/*" element={<Page404/>} />   
      </Routes>
    </div>
  );
}

export default App;
