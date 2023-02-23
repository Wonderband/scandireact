import css from "./ProductCard.module.scss";
export const ProductCard = ({ product, checkbox }) => {
  return (
    <li className={`${css.card} ${product.type}`}>
      <input
        type="checkbox"
        className="delete-checkbox"
        id={product.sku}
        ref={checkbox}
      />
      <div className={css.info}>
        <div className={css.mainInfo}>
          <p>
            <span>Name:</span> {product.name}
          </p>
          <p>
            <span>SKU:</span> {product.sku}
          </p>
          <p>
            <span>Price:</span> {product.price}
          </p>
          <p>
            <span>Type:</span> {product.type}
          </p>
        </div>
        <div className={css.details}>
          {product.type === "DVD" && (
            <p>
              <span>Size:</span> {product.size} MB
            </p>
          )}
          {product.type === "Book" && (
            <p>
              <span>Weight:</span> {product.weight} KG
            </p>
          )}
          {product.type === "Furniture" && (
            <div className={css.furnParams}>
              <p>
                <span>Height:</span> {product.height} CM
              </p>
              <p>
                <span>Width:</span> {product.width} CM
              </p>
              <p>
                <span>Length:</span> {product.length} CM
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
