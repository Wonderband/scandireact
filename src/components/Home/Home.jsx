import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/operations";
import { selectProducts } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";

export const Home = () => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const products = useSelector(selectProducts);
  return (
    <div>
      I`m HOME PAGE
      <ul>
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </ul>
    </div>
  );
};
