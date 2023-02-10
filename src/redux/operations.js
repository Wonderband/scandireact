import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectSelected } from "./selectors";

async function getProducts(_, thunkAPI) { 
    // console.log("server!");
    try {
        const res = await axios
            .get("http://localhost/scandireact/php/productsdatabase.php");           
        // console.log(res);
        return res.data;    
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);        
    }
}

async function deleteProducts(productsToDelete, thunkAPI) { 
    console.log("delete");
    // const productsToDelete =useSelector(selectSelected);
    console.log(productsToDelete);
    try {
        const res = await axios
            .post("http://localhost/scandireact/php/deleteProducts.php", { selected: productsToDelete });           
        console.log(res);
        return productsToDelete; 
        
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);        
    }
}

export const getAllProducts = createAsyncThunk(
  'changeProducts/getProducts',
  getProducts
);

export const deleteSelected = createAsyncThunk(
  'changeProducts/deleteSelected',
  deleteProducts
);