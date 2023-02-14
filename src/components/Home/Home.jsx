import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getAllProducts } from "../../redux/operations";
import { selectPending, selectProducts } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const pending = useSelector(selectPending);
  const checkboxes = products.map((product) => createRef());

  const submitHandle = (e) => {
    e.preventDefault();
    const selectedSkus = products
      .filter((_, i) => checkboxes[i].current.checked)
      .map((product) => product.sku);
    dispatch(deleteSelected(selectedSkus))
      .unwrap()
      .then(() => {
        toast("Successfully deleted");
      })
      .catch((error) => {
        toast(error);
      });
  };

  return (
    <div>
      {pending && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
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
