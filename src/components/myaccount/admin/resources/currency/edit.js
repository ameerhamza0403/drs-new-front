import React, { Component, useEffect, useState } from "react";
import { GetcurrencyDataById, PutcurrencyDataById } from "..//shared/currency";
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

let EditCurrency = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PutcurrencyDataById(props.IDforAPI, values);
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .min(4, `Currency Name has to be at least 4 characters`)
        .required("Currency Name is required"),
      code: Yup.string()
        .min(3, `Currency Code has to be at least 3 characters`)
        .required("Currency Code is required")
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

  const [initialValues, setInitialValues] = useState({
    name: "",
    code: "",
    active: false
  });

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
  let [modal, setModal] = useState(true);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetcurrencyDataById(props.IDforAPI);
    setInitialValues(initialValues);
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Add Currency</ModalHeader>
        <ModalBody>
          <div className="container">
            <Formik
              initialValues={initialValues}
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
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Currency Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder={initialValues.name}
                              autoComplete="given-name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <FormFeedback>{errors.name}</FormFeedback>
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Currency Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="code"
                              id="code"
                              placeholder={initialValues.code}
                              autoComplete="given-name"
                              valid={!errors.code}
                              invalid={touched.code && !!errors.code}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                            />
                            <FormFeedback>{errors.code}</FormFeedback>
                            <br />
                            <input
                              name="active"
                              id="active"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.active}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Active
                            </label>
                          </div>
                        </div>
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

export default EditCurrency;
