import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JointClass } from "../../classes/product";
import { addNewProduct } from "../../redux/operations";
import { selectPending } from "../../redux/selectors";
// import {
//   toastAddProductError,
//   toastAddProductSuccess,
// } from "components/Toast/Toast";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeValue, setTypeValue] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const pending = useSelector(selectPending);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/", { replace: true });
    }
  }, [shouldRedirect, navigate]);

  const onSubmitHandle = (values) => {
    const newProduct = new JointClass(values.type, values);
    dispatch(addNewProduct(newProduct))
      .unwrap()
      .then(() => {
        toast(`Product ${newProduct.name} added successfully!`);
        setShouldRedirect(true);
      })
      .catch((error) => {
        toast(error);
      });
  };

  const onChangeHandle = (e, { values, setFieldValue }) => {
    console.log("field changed");
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value;
    console.log(fieldName, fieldValue);
    values[fieldName] = fieldValue;
    console.log(values);
    // setFormData({ ...formData, [fieldName]: fieldValue });

    if (fieldName === "type") {
      console.log("type changed!");
      // values[fieldName] = fieldValue;
      values.size = "";
      values.weight = "";
      values.height = "";
      values.width = "";
      values.length = "";
      console.log(values.type);
      setTypeValue(values.type);
      console.log(values);
      // setFormData({
      //   ...formData,
      //   [fieldName]: fieldValue,
      //   size: "",
      //   weight: "",
      //   height: "",
      //   width: "",
      //   length: "",
      // });
      // console.log(values);
    }
  };
  return (
    <Formik
      initialValues={{
        sku: "",
        name: "",
        price: "",
        type: "",
        size: "",
        weight: "",
        height: "",
        width: "",
        length: "",
      }}
      onSubmit={onSubmitHandle}
      // validationSchema={validation}
    >
      {(values) => {
        return (
          <Form onChange={(e) => onChangeHandle(e, values)}>
            <button type="submit">SAVE</button>
            <Link to="/">
              <button type="button">CANCEL</button>
            </Link>
            <br />
            <label>
              SKU
              <Field name="sku" type="text" value={values.sku} />
            </label>
            <label>
              NAME
              <Field name="name" type="text" value={values.name} />
            </label>
            <label>
              PRICE
              <Field name="price" type="number" value={values.price} />
            </label>
            <br />

            <label>
              Type switcher
              <Field
                as="select"
                name="type"
                value={values.type}
                required
                // onChange={(e) => {
                //   onChangeHandle(e, values);
                //   values.setFieldValue("type", e.target.value);
                // }}
              >
                <option value="" disabled>
                  Select the option
                </option>
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </Field>
              <br />
            </label>
            {typeValue === "DVD" && (
              <label>
                Size (MB)
                <Field type="number" name="size" value={values.size} />
              </label>
            )}
            {typeValue === "Book" && (
              <label>
                Weight (KG)
                <Field type="number" name="weight" value={values.weight} />
              </label>
            )}
            {typeValue === "Furniture" && (
              <>
                <label>
                  Height (CM)
                  <Field type="number" name="height" value={values.height} />
                </label>
                <label>
                  Width (CM)
                  <Field type="number" name="width" value={values.width} />
                </label>
                <label>
                  Length (CM)
                  <Field type="number" name="length" value={values.length} />
                </label>
              </>
            )}
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
          </Form>
        );
      }}
    </Formik>
  );
};
