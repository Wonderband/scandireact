export const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <li>
      <div style={{ outline: "1px solid red" }}>
        <p>Name: {product.name}</p>
        <p>SKU: {product.sku}</p>
        <p>Price: {product.price}</p>
        <p>Type: {product.type}</p>
        {product.size > 0 ?? <p>Size: {product.size}</p>}
      </div>
    </li>
  );
};
