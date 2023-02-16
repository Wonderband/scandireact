import css from "./ProductCard.module.scss";
export const ProductCard = ({ product, checkbox }) => {
  return (
    <li className={css.card}>
      <input
        type="checkbox"
        className="deleteCheckbox"
        id={product.sku}
        ref={checkbox}
      />
      <div className={css.info}>
        <p>Name: {product.name}</p>
        <p>SKU: {product.sku}</p>
        <p>Price: {product.price}</p>
        <p>Type: {product.type}</p>
        {product.type === "DVD" && <p>Size: {product.size} MB</p>}
        {product.type === "Book" && <p>Weight: {product.weight} KG</p>}
        {product.type === "Furniture" && (
          <>
            <p>Height: {product.height} CM</p>
            <p>Width: {product.width} CM</p>
            <p>Length: {product.length} CM</p>
          </>
        )}
      </div>
    </li>
  );
};
