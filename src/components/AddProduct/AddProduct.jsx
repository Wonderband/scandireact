import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JointClass } from "../../classes/product";
import { addNewProduct } from "../../redux/operations";
import { selectPending } from "../../redux/selectors";
import * as yup from "yup";
import { toastError, toastSuccess } from "../Toast/Toast";

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
        toastSuccess(`Product ${newProduct.name} added successfully!`);
        setShouldRedirect(true);
      })
      .catch((error) => {
        toastError(error);
      });
  };

  const onChangeHandle = (e, { values, setFieldValue }) => {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value;
    values[fieldName] = fieldValue;
    if (fieldName === "type") {
      values.size = "";
      values.weight = "";
      values.height = "";
      values.width = "";
      values.length = "";
      setTypeValue(values.type);
    }
  };

  let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
  const floatValidator = yup
    .number()
    .positive()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val) => {
        if (val !== undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .min(0.01, "Price should be at least $0.01")
    .max(1000000, "Price should be no more than $1000000")
    .required("Please input the price");

  const validation = yup.object().shape({
    sku: yup.string().required("Please, enter SKU"),
    name: yup
      .string()
      .min(2, "Name should be at least 2 characters")
      .max(16, "Name should be no longer than 16 characters")
      .required("Please, enter the name"),
    price: floatValidator,
    type: yup.string().required("Please choose the type"),
    // size: yup.number().required("No size!"),
  });
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
      validationSchema={validation}
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
            <ErrorMessage
              name="sku"
              component="span"
              // className={styles.errorMessage}
            />
            <label>
              NAME
              <Field name="name" type="text" value={values.name} />
            </label>
            <ErrorMessage
              name="name"
              component="span"
              // className={styles.errorMessage}
            />
            <label>
              PRICE
              <Field
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={values.price}
              />
            </label>
            <ErrorMessage
              name="price"
              component="span"
              // className={styles.errorMessage}
            />
            <br />

            <label>
              Type switcher
              <Field as="select" name="type" value={values.type} required>
                <option hidden>Select the option</option>
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </Field>
              <ErrorMessage
                name="type"
                component="span"
                // className={styles.errorMessage}
              />
              <br />
            </label>
            {typeValue === "DVD" && (
              <label>
                Size (MB)
                <Field
                  type="number"
                  name="size"
                  value={values.size}
                  min={1}
                  max={1000000}
                  required
                />
              </label>
            )}
            {typeValue === "Book" && (
              <label>
                Weight (KG)
                <Field
                  type="number"
                  name="weight"
                  step="0.001"
                  placeholder="0.000"
                  min={0.001}
                  max={1000000}
                  value={values.weight}
                  required
                />
              </label>
            )}
            {typeValue === "Furniture" && (
              <>
                <label>
                  Height (CM)
                  <Field
                    type="number"
                    name="height"
                    min={1}
                    max={1000000}
                    value={values.height}
                    required
                  />
                </label>
                <label>
                  Width (CM)
                  <Field
                    type="number"
                    name="width"
                    min={1}
                    max={1000000}
                    value={values.width}
                    required
                  />
                </label>
                <label>
                  Length (CM)
                  <Field
                    type="number"
                    name="length"
                    min={1}
                    max={1000000}
                    value={values.length}
                    required
                  />
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
