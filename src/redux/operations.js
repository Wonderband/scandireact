import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function getProducts(_, thunkAPI) {    
    try {
        const res = await axios
            .get("http://localhost/scandireact/src/php/showProducts.php"); 
        if (res.data.error) {
            return thunkAPI.rejectWithValue(res.data.error);
        }
        return res.data;    
    } catch (error) {       
        return thunkAPI.rejectWithValue(error.message);        
    }
}

async function deleteProducts(productsToDelete, thunkAPI) {     
    try {
       const res = await axios
            .post("http://localhost/scandireact/src/php/deleteProducts.php", { selected: productsToDelete });        
          if (res.data.error) {
            return thunkAPI.rejectWithValue(res.data.error);
        }
        return productsToDelete; 
        
        
    } catch (error) {        
        return thunkAPI.rejectWithValue(error.message);        
    }
}

async function addProduct (product, thunkAPI) {     
    try {
        const res = await axios
            .post("http://localhost/scandireact/src/php/addProduct.php", product);       
          if (res.data.error) {
            return thunkAPI.rejectWithValue(res.data.error);
        }
        return res.data; 
        
    } catch (error) {        
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

export const addNewProduct = createAsyncThunk(
  'changeProducts/addProduct',
  addProduct
);