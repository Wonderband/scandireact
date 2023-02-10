import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getAllProducts } from "../../redux/operations";
import { selectProducts, selectSelected } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const checkboxes = products.map((product) => createRef());

  const handleAddProduct = () => {
    console.log("clicked!");
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(checkboxes);
    const selectedSkus = products
      .filter((product, i) => checkboxes[i].current.checked)
      .map((product) => product.sku);
    console.log(selectedSkus);
    dispatch(deleteSelected(selectedSkus));
  };

  return (
    <div>
      I`m HOME PAGE
      <form action="" onSubmit={submitHandle}>
        <ul>
          {products.map((product, i) => {
            return (
              <ProductCard
                key={product.sku}
                product={product}
                checkbox={checkboxes[i]}
              />
            );
          })}
        </ul>
        <button type="submit">MASS DELETE</button>
        <button type="button" onClick={handleAddProduct}>
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};
