import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getAllProducts } from "../../redux/operations";
import { selectProducts } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const checkboxes = products.map((product) => createRef());

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(checkboxes);
    const selectedSkus = products
      .filter((_, i) => checkboxes[i].current.checked)
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
      </form>
      <Link to="/add-product">
        <button type="button">ADD PRODUCT</button>
      </Link>
    </div>
  );
};
