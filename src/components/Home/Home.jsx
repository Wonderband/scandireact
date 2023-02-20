import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelected, getAllProducts } from "../../redux/operations";
import { selectPending, selectProducts } from "../../redux/selectors";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toastError, toastSuccess } from "../Toast/Toast";
import css from "./Home.module.scss";

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
      <header className={css.header}>
        <h1 className={css.title}>Product List</h1>
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
        <div>
          <button type="submit" className={css.button} form="products">
            MASS DELETE
          </button>
          <Link to="/add-product">
            <button type="button" className={css.button}>
              ADD PRODUCT
            </button>
          </Link>
        </div>
      </header>

      {!products.length && <div>Database is empty!</div>}
      <form id="products" onSubmit={submitHandle}>
        {products.length > 0 && (
          <ul className={css.cardBoard}>
            {products.map((product, i) => {
              return (
                <ProductCard
                  key={product.sku}
                  product={product}
                  className={css.card}
                  checkbox={checkboxes[i]}
                />
              );
            })}
          </ul>
        )}
      </form>
      <footer className={css.footer}>Scandiweb!!!</footer>
    </div>
  );
};
