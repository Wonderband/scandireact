import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function getProducts(_, thunkAPI) { 
    console.log("server!");
    try {
        const res = await axios
            .get("http://localhost/scandireact/php/productsdatabase.php");           
        console.log(res);
        return res.data;    
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);        
    }
}

export const getAllProducts = createAsyncThunk(
  'changeProducts/getProducts',
  getProducts
);