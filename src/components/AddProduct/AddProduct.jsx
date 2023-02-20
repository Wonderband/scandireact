import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { JointClass } from "../../classes/product";
import { addNewProduct } from "../../redux/operations";
import { selectPending } from "../../redux/selectors";
import * as yup from "yup";
import { toastError, toastSuccess } from "../Toast/Toast";
import css from "./AddProduct.module.scss";

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
    .positive()
    .test(
      "is-decimal",
      "Should be decimal with max 2 digits after comma",
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
    size: yup.number().positive("Size must be greater than 0"),
    // .when("type", {
    //   is: "DVD",
    //   then: yup.number().required("Size is required for DVD type"),
    // }),
    // weight: yup.number().when("type", {
    //   is: (value) => value === "Book",
    //   then: yup.number().required("Weight is required for Book type"),

    // then: yup.number().required("Weight is required for Book type"),
    // .positive("Weight must be greater than 0"),
    // }),
    // height: yup.number().when("type", {
    //   is: "Furniture",
    //   then: yup.number().required("Height is required for Furniture type"),
    //   // .moreThan(0, "Height must be greater than 0"),
    // }),
    // width: yup.number().when("type", {
    //   is: "Furniture",
    //   then: yup.number().required("Width is required for Furniture type"),
    //   // .moreThan(0, "Width must be greater than 0"),
    // }),
    // length: yup.number().when("type", {
    //   is: "Furniture",
    //   then: yup.number().required("Length is required for Furniture type"),
    // .moreThan(0, "Length must be greater than 0"),
    // }),
  });
  return (
    <div className={css.modalBackdrop}>
      {/* <div className={css.modalForm}> */}

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
            >
              <h1 className={css.formTitle}>Please, add your product</h1>
              <div className={css.fields}>
                <label className={css.formField}>
                  <span>SKU:</span>
                  <Field
                    name="sku"
                    type="text"
                    value={values.sku}
                    placeholder="Input unique SKU"
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
                    name="name"
                    type="text"
                    value={values.name}
                    placeholder="Input the name"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.formField}>
                  PRICE:
                  <Field
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={values.price}
                  />
                  <ErrorMessage
                    name="price"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.formField}>
                  Type switcher:
                  <Field as="select" name="type" value={values.type} required>
                    <option hidden>Select the option</option>
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
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
                      />
                    </label>
                  </>
                )}
              </div>

              <div className={css.buttons}>
                <button type="submit" className={css.button}>
                  SAVE
                </button>
                <Link to="/">
                  <button type="button" className={css.button}>
                    CANCEL
                  </button>
                </Link>
              </div>
              {/* {pending && (
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
              )} */}
            </Form>
          );
        }}
      </Formik>
    </div>
    // </div>
  );
};
