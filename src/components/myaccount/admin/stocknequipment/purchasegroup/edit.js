import React, { Component, useEffect, useState } from "react";
import { GetPurchaseOrderDataById, PutPurchaseOrderDataById } from "../shared/purchasegroup";
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
import { GetListingForLocation } from '../shared/location';


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

let EditPurchaseOrder = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render


    //Toast

    function errort() {
      // add type: 'error' to options
      return toast.error('Failed with Error...', {
        position: toast.POSITION.BOTTOM_RIGHT
      });

    }
    function success(response) {
      if (response == "Exception Error") {
        return toast.error('Failed with Error "' + response + '"', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        return toast.success(response, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PutPurchaseOrderDataById(props.IDforAPI, values).then(res => success(res.data.message)).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .required("Storage Location is required"),
        locationId: Yup.string()
        .required("Location is required"),
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

  let [initialValues, setInitialValues] = useState({
    name: "",
    isActive: true
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
  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  let [location, setLocation] = useState([]);

  async function getlistapi() {
    const { data: initialValues } = await GetPurchaseOrderDataById(props.IDforAPI);
    setInitialValues(initialValues);

    const {data: location} = await GetListingForLocation(0,0);
    setLocation(location);

    setModal(true);
  }

  return (
    <div>
       <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Storage Location</ModalHeader>
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
                      <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Purchase Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder=""
                              autoComplete="off"
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



                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="locationId">Location</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="locationId"
                              id="locationId"
                              placeholder=""
                              autoComplete="off"
                              valid={!errors.locationId}
                              invalid={touched.locationId && !!errors.locationId}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.locationId}
                            >
                              <option selected />
                              {location.map(e=><option value={e.locationId}>{e.name}</option>)}
                            </Input>
                            <FormFeedback>{errors.locationId}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="mobile">Mobile</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="mobile"
                              id="mobile"
                              placeholder=""
                              autoComplete="off"
                              // valid={!errors.mobile}
                              // invalid={touched.mobile && !!errors.mobile}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.mobile}
                            />
                            {/* <FormFeedback>{errors.mobile}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="phone">Phone</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder=""
                              autoComplete="off"
                              // valid={!errors.phone}
                              // invalid={touched.phone && !!errors.phone}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.phone}
                            />
                            {/* <FormFeedback>{errors.phone}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="fax">Fax</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="fax"
                              id="fax"
                              placeholder=""
                              autoComplete="off"
                              // valid={!errors.fax}
                              // invalid={touched.fax && !!errors.fax}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.fax}
                            />
                            {/* <FormFeedback>{errors.fax}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Active</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="isActive"
                              id="isActive"
                              // valid={!errors.isActive}
                              // invalid={touched.isActive && !!errors.isActive}
                              onClick={handleChange}
                              // onBlur={handleBlur}
                              value={values.isActive}
                              defaultChecked={initialValues.isActive}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              isActive
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

export default EditPurchaseOrder;
