import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PutTaxCodeDataById, GetTaxCodeDataById } from "..//shared/vatcode";

const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
  plusbutton: {
    color: "white",
    borderRadius: "50px",
    width: "10px",
    cursor: "pointer",
    float: "left"
    // marginTop: '10px',
    // marginLeft: '5px',
  }
};

let VatCodeEdit = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  let [GetValues, setGetValues] = useState([
    // {
    //   code: "",
    //   rete: 0,
    //   description: ""
    // }
  ]);



  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PutTaxCodeDataById(props.IDforAPI, values)
      .then(() => success())
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    await GetTaxCodeDataById(props.IDforAPI).then(res => {
      setGetValues((GetValues = res.data));
      // setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    setModal(true);
  }
  //Tost

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success() {
    return toast.success("Saved Successfully... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      code: Yup.string()
        .min(2, `Code has to be at least 2 characters`)
        .required("Code is required"),
      rate: Yup.string()
        .min(1, `Rate has to be at least 1 number`)
        .required("Rate is required")
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return getErrorsFromValidationError(error);
      }
    };
  };

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR]
      };
    }, {});
  };


  function findFirstError(formName, hasError) {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus();
        break;
      }
    }
  }

  function validateForm(errors) {
    findFirstError("simpleForm", fieldName => {
      return Boolean(errors[fieldName]);
    });
  }

  function touchAll(setTouched, errors) {
    setTouched({
      name: true
    });
    validateForm(errors);
  }

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">VAT Code</h3>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <Formik
              initialValues={GetValues}
              validate={validate(validationSchema)}
              onSubmit={onSubmit}
              render={({
                values,
                errors,
                touched,
                status,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setTouched
              }) => (
                <Row>
                  <Col lg="12">
                    <Form onSubmit={handleSubmit} noValidate name="simpleForm">
                      <FormGroup>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="code"
                              id="code"
                              // placeholder={GetValues.code}
                              // autoComplete="given-name"
                              valid={!errors.code}
                              invalid={touched.code && !!errors.code}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={GetValues.code}
                              // defaultValue={GetValues.code}
                            />

                            <FormFeedback>{errors.code}</FormFeedback>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="rate">VAT%</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="rate"
                              id="rate"
                              // placeholder={GetValues.rate}
                              // autoComplete="given-name"
                              valid={!errors.rate}
                              invalid={touched.rate && !!errors.rate}
                              // autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.rate}
                              // defaultValue={GetValues.rate}
                            />

                            <FormFeedback>{errors.rate}</FormFeedback>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Description</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="description"
                              id="description"
                              // placeholder={GetValues.description}
                              // autoComplete="given-name"
                              // valid={!errors.description}
                              // invalid={touched.description && !!errors.description}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.description}
                            />

                            {/* <FormFeedback>{errors.description}</FormFeedback> */}
                          </div>
                        </div>
                        <input
                          name="isActive"
                          id="isActive"
                          valid={!errors.isActive}
                          invalid={touched.isActive && !!errors.isActive}
                          onClick={handleChange}
                          onBlur={handleBlur}
                          value={values.isActive}
                          defaultChecked={GetValues.isActive}
                          type="checkbox"

                        />
                        &nbsp;&nbsp;&nbsp;
                        <label className="form-check-label" for="defaultCheck1">
                          isActive
                        </label>
                      </FormGroup>
                      <FormGroup>
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="primary"
                            className="mr-1"
                            style={classes.button}
                            disabled={isSubmitting || !isValid}
                          >
                            {isSubmitting ? "Wait..." : "Submit"}
                          </Button>

                          <Button
                            color="secondary"
                            onClick={handleOpen}
                            style={classes.button}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              )}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VatCodeEdit;
