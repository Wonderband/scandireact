import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { JointClass } from "../../classes/product";
import { addNewProduct } from "../../redux/operations";
import { toastError, toastSuccess } from "../Toast/Toast";
import css from "./AddProduct.module.scss";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeValue, setTypeValue] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/", { replace: true });
    }
  }, [shouldRedirect, navigate]);

  useEffect(() => {
    const onEscapeHandler = (e) => {
      if (e.code === "Escape") {
        navigate("/", { replace: true });
      }
    };

    document.addEventListener("keydown", onEscapeHandler);
    return () => {
      document.removeEventListener("keydown", onEscapeHandler);
    };
  }, [navigate]);

  const clickOnBackdropHandler = (e) => {
    if (e.target === e.currentTarget) {
      navigate("/", { replace: true });
    }
  };

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

  const onChangeHandle = (e, { values }) => {
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
    .test(
      "is-decimal",
      "Should be positive with max 2 digits after comma",
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
    type: yup
      .string()
      .oneOf(["DVD", "Book", "Furniture"])
      .required("Please choose the type"),
  });
  return (
    <div className={css.modalBackdrop} onClick={clickOnBackdropHandler}>
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
            <Form
              onChange={(e) => onChangeHandle(e, values)}
              className={css.modalForm}
              id="product_form"
            >
              <h1 className={css.formTitle}>Please, add your product</h1>
              <Link to="/">
                <span
                  className={css.close}
                  onClick={() => {
                    <Navigate to="/" />;
                  }}
                ></span>
              </Link>
              <div className={css.fields}>
                <label className={css.formField}>
                  <span>SKU:</span>
                  <Field
                    className={css.fieldValue}
                    name="sku"
                    type="text"
                    value={values.sku}
                    placeholder="Input unique SKU"
                    id="sku"
                  />
                  <ErrorMessage
                    name="sku"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.formField}>
                  NAME:
                  <Field
                    className={css.fieldValue}
                    name="name"
                    type="text"
                    value={values.name}
                    placeholder="Input the name"
                    id="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.formField}>
                  PRICE: $
                  <Field
                    className={css.fieldValue}
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={values.price}
                    id="price"
                  />
                  <ErrorMessage
                    name="price"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.formField}>
                  Type switcher:
                  <Field
                    as="select"
                    name="type"
                    value={values.type}
                    className={css.fieldValue}
                    required
                    id="productType"
                  >
                    <option hidden>Select the option</option>
                    <option value="DVD" id="DVD">
                      DVD
                    </option>
                    <option value="Book" id="Book">
                      Book
                    </option>
                    <option value="Furniture" id="Furniture">
                      Furniture
                    </option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                {typeValue === "DVD" && (
                  <label className={css.formField}>
                    Size (MB):
                    <Field
                      type="number"
                      name="size"
                      value={values.size}
                      min={1}
                      max={1000000}
                      required
                      placeholder="0"
                      className={css.fieldValue}
                      id="size"
                    />
                  </label>
                )}
                {typeValue === "Book" && (
                  <label className={css.formField}>
                    Weight (KG):
                    <Field
                      type="number"
                      name="weight"
                      step="0.001"
                      placeholder="0.000"
                      min={0.001}
                      max={1000000}
                      value={values.weight}
                      required
                      className={css.fieldValue}
                      id="weight"
                    />
                  </label>
                )}
                {typeValue === "Furniture" && (
                  <>
                    <label className={css.formField}>
                      Height (CM):
                      <Field
                        type="number"
                        name="height"
                        min={1}
                        max={1000000}
                        value={values.height}
                        required
                        placeholder="0"
                        className={css.fieldValue}
                        id="height"
                      />
                    </label>
                    <label className={css.formField}>
                      Width (CM):
                      <Field
                        type="number"
                        name="width"
                        min={1}
                        max={1000000}
                        value={values.width}
                        required
                        placeholder="0"
                        className={css.fieldValue}
                        id="width"
                      />
                    </label>
                    <label className={css.formField}>
                      Length (CM):
                      <Field
                        type="number"
                        name="length"
                        min={1}
                        max={1000000}
                        value={values.length}
                        required
                        placeholder="0"
                        className={css.fieldValue}
                        id="length"
                      />
                    </label>
                  </>
                )}
              </div>
              <div className={css.buttons}>
                <button type="submit" className={css.button}>
                  Save
                </button>
                <Link to="/">
                  <button type="button" className={css.button}>
                    Cancel
                  </button>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
