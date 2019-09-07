import { GetLocationDataById, PutLocationDataById } from "../shared/location";
import React, { Component, useState, useEffect } from "react";
import { GetListingForAccount } from "../../account/shared/accounts";
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
    width: "10px",
    cursor: "pointer",
    float: "left"
    // marginTop: '10px',
    // marginLeft: '5px',
  }
};

let EditLocation = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Toast

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
  let [accountdata, setaccountdata] = useState([
    {
      name: "",
      isActive: true
    }
  ]);

  useEffect(() => {
    getaccounts();
  }, []);

  async function getaccounts() {
    const { data: accountdata } = await GetListingForAccount();
    console.log(accountdata);
    setaccountdata(accountdata);
  }

  async function onSubmit(initialValues, { setSubmitting, setErrors }) {
    await PutLocationDataById(props.IDforAPI, initialValues)
      .then(() => success())
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        //.min(4, `Name has to be at least 4 characters`)
        .required("Name is requierd"),
      faxNo: Yup.string().required("Fax Number is requierd"),
      locationAddress: Yup.string().required("Address is requierd"),
      phoneNo: Yup.string().required("Phone is requierd"),
      type: Yup.string().required("Type is requierd"),
      city: Yup.string().required("City is requierd")
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
    return setModal((modal = !modal)), setTimeout(() => props.cross(), 200);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  let [initialValues, setInitialValues] = useState();

  async function getlistapi() {
    const { data: initialValues } = await GetLocationDataById(props.IDforAPI);
    console.log(initialValues);
    setInitialValues(initialValues);
    setModal(true);
  }

  return (
    <div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="lg"
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">Location</h3>
        </ModalHeader>
        <ModalBody
          style={{ "max-height": "calc(100vh - 150px)", "overflow-y": "auto" }}
        >
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
                            <Label for="accountId">Account</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              type="select"
                              name="accountId"
                              id="accountId"
                              //   autoComplete="given-name"
                              //   valid={!errors.firstWorksheet}
                              //   invalid={touched.firstWorksheet && !!errors.firstWorksheet}
                              //   autoFocus={true}
                              //   required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.accountId}
                            >
                              <option selected />
                              {accountdata.map(e => (
                                <option value={e.accountId}>{e.name}</option>
                              ))}
                            </Input>
                            {/* <FormFeedback>{errors.accountId}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Location Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="name"
                              placeholder="Enter Location Name"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="name"
                              autoComplete="given-name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              autoFocus={true}
                              required
                            />
                            <FormFeedback> {errors.name}</FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="locationAddress">
                              Location Address
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="locationAddress"
                              placeholder="Enter Location Address"
                              type="text"
                              value={values.locationAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="locationAddress"
                              autoComplete="given-name"
                              valid={!errors.locationAddress}
                              invalid={
                                touched.locationAddress &&
                                !!errors.locationAddress
                              }
                              autoFocus={true}
                              required
                            />
                            <FormFeedback>
                              {" "}
                              {errors.locationAddress}
                            </FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="phoneNo">Phone Number</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="phoneNo"
                              placeholder="Enter Phone Number"
                              type="text"
                              value={values.phoneNo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="phoneNo"
                              autoComplete="given-name"
                              valid={!errors.phoneNo}
                              invalid={touched.phoneNo && !!errors.phoneNo}
                              autoFocus={true}
                              required
                            />
                            <FormFeedback> {errors.phoneNo}</FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="faxNo">Fax Number</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="faxNo"
                              placeholder="Enter Fax Number"
                              type="text"
                              value={values.faxNo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="faxNo"
                              autoComplete="given-name"
                              valid={!errors.faxNo}
                              invalid={touched.faxNo && !!errors.faxNo}
                              autoFocus={true}
                              required
                            />
                            <FormFeedback> {errors.faxNo}</FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="type">Location Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="type"
                              placeholder="Enter Location Type"
                              type="text"
                              value={values.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="type"
                              autoComplete="given-name"
                              valid={!errors.type}
                              invalid={touched.type && !!errors.type}
                              autoFocus={true}
                              required
                            />
                            <FormFeedback> {errors.type}</FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="city">City</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <Input
                              id="city"
                              placeholder="Enter City"
                              type="text"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="city"
                              // autoComplete="given-name"
                              valid={!errors.city}
                              invalid={touched.city && !!errors.city}
                              autoFocus={true}
                              required
                            />
                            <FormFeedback> {errors.city}</FormFeedback>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="isActive"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-2">
                            <input
                              name="isActive"
                              id="isActive"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.isActive}
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

export default EditLocation;
