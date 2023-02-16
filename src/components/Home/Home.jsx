import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getAllProducts } from "../../redux/operations";
import { selectPending, selectProducts } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../Toast/Toast";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .unwrap()
      .then(() => {})
      .catch((error) => toastError(error));
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const pending = useSelector(selectPending);
  const checkboxes = products.map((product) => createRef());

  const submitHandle = (e) => {
    e.preventDefault();
    const selectedSkus = products
      .filter((_, i) => checkboxes[i].current.checked)
      .map((product) => product.sku);
    if (!selectedSkus.length) {
      toastError("No products selected!");
      return;
    }
    dispatch(deleteSelected(selectedSkus))
      .unwrap()
      .then(() => {
        toastSuccess("Successfully deleted");
      })
      .catch((error) => {
        toastError(error);
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
        {products.length > 0 && (
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
        )}
        {!products.length && <div>Database is empty!</div>}
        <button type="submit">MASS DELETE</button>
      </form>
      <Link to="/add-product">
        <button type="button">ADD PRODUCT</button>
      </Link>
    </div>
  );
};
