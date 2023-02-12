import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { JointClass } from "../../classes/product";
import { addNewProduct } from "../../redux/operations";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const onSubmitHandle = (e) => {
    e.preventDefault();
    // console.log("submitted");
    const newProduct = new JointClass(formData.type, formData);
    // console.log(newProduct);
    dispatch(addNewProduct(newProduct));
    navigate("/", { replace: true });
  };

  const onChangeHandle = (e) => {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value;

    setFormData({ ...formData, [fieldName]: fieldValue });
    if (fieldName === "type")
      setFormData({
        ...formData,
        [fieldName]: fieldValue,
        size: "",
        weight: "",
        height: "",
        width: "",
        length: "",
      });

    // console.log(formData);
  };
  return (
    <form onSubmit={onSubmitHandle} onChange={onChangeHandle}>
      <button type="submit">SAVE</button>
      <Link to="/">
        <button type="button">CANCEL</button>
      </Link>
      <br />
      <label>
        SKU
        <input name="sku" type="text" defaultValue={formData.sku} />
      </label>
      <label>
        NAME
        <input name="name" type="text" defaultValue={formData.name} />
      </label>
      <label>
        PRICE
        <input name="price" type="number" defaultValue={formData.price} />
      </label>
      <br />

      <label>
        Type switcher
        <select
          name="type"
          defaultValue={formData.type}
          required
          onChange={onChangeHandle}
        >
          <option value="" disabled>
            Select the option
          </option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
        <br />
      </label>
      {formData.type === "DVD" && (
        <label>
          Size (MB)
          <input type="number" name="size" defaultValue={formData.size} />
        </label>
      )}
      {formData.type === "Book" && (
        <label>
          Weight (KG)
          <input type="number" name="weight" defaultValue={formData.weight} />
        </label>
      )}
      {formData.type === "Furniture" && (
        <>
          <label>
            Height (CM)
            <input type="number" name="height" defaultValue={formData.height} />
          </label>
          <label>
            Width (CM)
            <input type="number" name="width" defaultValue={formData.width} />
          </label>
          <label>
            Length (CM)
            <input type="number" name="length" defaultValue={formData.length} />
          </label>
        </>
      )}
    </form>
  );
};
