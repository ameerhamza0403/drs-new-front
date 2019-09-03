import React, { Component, useState, useEffect } from "react";
import {  PostListingForExpenseCategory } from "../shared/expensecategory";

import Select from 'react-select';
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


const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
  plusbutton: {
    color: "white",
    borderRadius: "50px",
    width: '10px',
    cursor: 'pointer',
    float: 'left',
    // marginTop: '10px',
    // marginLeft: '5px',
  },

};

let AddExpenseCategory = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

      //Tost

      function errort() {
        // add type: 'error' to options
        return toast.error('Failed with Error...', {
          position: toast.POSITION.BOTTOM_RIGHT
        });

      }
      function success() {
        return toast.success("Saved Successfully... ", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values);
    await PostListingForExpenseCategory(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }


  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Category has to be at least 4 characters`)
    .required("Category is requierd"),


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

  const initialValues = {
    group: "",
    name:"",
    defaultVAT:0,
    defaultCost:0,
    amountChangeable :false,
    isFuel:false,
    active: false
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
    return setModal((modal = !modal));
  };

  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
      <i className="fa fa-plus-circle fa-2x"></i>
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="lg"
      >
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">ExpenseCategory</h3></ModalHeader>
        <ModalBody style={{'max-height': 'calc(100vh - 150px)', 'overflow-y': 'auto'}}>
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
                            <Label for="group">Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="group"
                              id="group"
                              placeholder="e.g. Accommodation, Travel etc..."
                              autoComplete="given-name"
                              valid={!errors.group}
                              invalid={touched.group && !!errors.group}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.group}
                            />
                            <FormFeedback>{errors.group}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Category</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder=""
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

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultVAT">defaultVAT</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="defaultVAT"
                              id="defaultVAT"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              autoComplete="given-name"
                              valid={!errors.defaultVAT}
                              invalid={touched.defaultVAT && !!errors.defaultVAT}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultVAT}
                            />
                            <FormFeedback>{errors.defaultVAT}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultCost">Default Cost</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="defaultCost"
                              id="defaultCost"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.defaultCost}
                              invalid={touched.defaultCost && !!errors.defaultCost}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultCost}
                            />
                            <FormFeedback>{errors.defaultCost}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="amountChangeable"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="amountChangeable"
                              id="amountChangeable"
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
                              amount can be changed
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="isFuel">is Fuel</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="isFuel"
                              id="isFuel"
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
                              If selected, the staff will be prompted to enter isFuel quantity as well as cost
                            </label>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

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

export default AddExpenseCategory;
