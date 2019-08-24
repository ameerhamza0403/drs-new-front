import React, { Component, useState, useEffect } from "react";
import {
  PostListingForVehiclemanage,
  GetTrackingDeviceData
} from "..//shared/manage";
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
import TextField from "@material-ui/core/TextField";
import { GetListingForcurrency } from "../../resources/shared/currency";
import { GetListingForVehicleType } from "../shared/vehicletype";
import { GetListingForVehicleGroups } from "../shared/vehiclegroup";

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
  },
  input: {
    width: "100px",
    // height: "25px",
    border: "1px solid black",
    textAlign: "center"
  },
  divider:{
    height: '1px',
    backgroundColor: '#CED4DA',
    width: '99%',
    marginLeft: '1px',
  }
};

let VehicleFuelCostAdd = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  let [timevalue, setTimevalue] = useState({
    startDate: "",
    endDate: ""
  });
  async function onSubmit(values, { setSubmitting, setErrors }) {
    let newvalue = values;
    newvalue.startDate = timevalue.startDate;
    newvalue.endDate = timevalue.endDate;
    console.log(newvalue);
    await PostListingForVehiclemanage(newvalue)
      .then(() => success())
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  let [currency, setCurrency] = useState([
    {
      currencyId: "",
      name: "",
      code: "",
      active: true
    }
  ]);

  let [vehicledata, setVehicledata] = useState([
    {
      vehicleTypeId: 0,
      name: "",
      active: true
    }
  ]);
  let [trackingdata, setTrackingdata] = useState([
    {
      trackingDeviceId: 0,
      code: "",
      remarks: "",
      active: true
    }
  ]);
  let [vehiclegroupdata, setVehicleGroupdata] = useState([
    {
      vehicleGroupId: "",
      name: "",
      active: true
    }
  ]);

  useEffect(() => {
    getcurrlist();
    getVehicletype();
    gettracking();
    getvehiclegroup();
  }, []);

  async function gettracking() {
    const { data: trackingdata } = await GetTrackingDeviceData();
    setTrackingdata(trackingdata);
  }
  async function getVehicletype() {
    const { data: vehicledata } = await GetListingForVehicleType();
    setVehicledata(vehicledata);
  }

  async function getcurrlist() {
    const { data: currency } = await GetListingForcurrency();
    setCurrency(currency);
  }

  async function getvehiclegroup() {
    const { data: vehiclegroupdata } = await GetListingForVehicleGroups();
    setVehicleGroupdata(vehiclegroupdata);
    // handleOpen();
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
      registration: Yup.string()
        .min(3, `Registration has to be at least 3 characters`)
        .required("Fuel Cost is required"),
      vehicleTypeId: Yup.string().required("Vehicle type is required"),
      vehicleGroupId: Yup.string().required("Vehicle Group is required")
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
    vehicleId: 0,
    registration: "",
    vehicleTypeId: 0,
    vehicleTypeName: "",
    vehicleGroupId: 0,
    vehicleGroupName: "",
    make: "",
    model: "",
    year: "",
    odometerUnit: "",
    refernce: "",
    trackingDeviceId: 0,
    usedForJobs: true,
    fixedResource: true,
    resourceId: 0,
    resourceName: "",
    costPerMile: 0,
    costPerDay: 0,
    cO2: 0,
    cO2Unit: 0,
    idleFuelConsump: 0,
    status: "",
    maxRPM: 0,
    attributes: "",
    vehicleCheckTypes: "",
    icon: "",
    active: true
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

  const handleDataChange = name => event => {
    if (name === "startDate") {
      setTimevalue({ ...timevalue, [name]: event.target.value });
    } else {
      setTimevalue({ ...timevalue, [name]: event.target.value });
    }
  };
  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="xl"
      >
        <ModalHeader toggle={handleOpen}>Fuel Cost</ModalHeader>
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
                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="registration">Registration</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="registration"
                                  id="registration"
                                  placeholder="i.e. D1 BKT"
                                  autoComplete="given-name"
                                  valid={!errors.registration}
                                  invalid={
                                    touched.registration &&
                                    !!errors.registration
                                  }
                                  autoFocus={true}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.registration}
                                  // maxLength={8}
                                  // style={classes.input}
                                />
                                <FormFeedback>
                                  {errors.registration}
                                </FormFeedback>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="refernce">Reference</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="refernce"
                                  id="refernce"
                                  // placeholder="i.e. Company Car"
                                  autoComplete="given-name"
                                  // valid={!errors.refernce}
                                  // invalid={
                                  //   touched.refernce &&
                                  //   !!errors.refernce
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.refernce}
                                  // maxLength={8}
                                  // style={classes.input}
                                />
                                {/* <FormFeedback>
                                  {errors.refernce}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="vehicleTypeId">Vehicle type</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="select"
                                  name="vehicleTypeId"
                                  id="vehicleTypeId"
                                  // placeholder="i.e. Company Car"
                                  autoComplete="given-name"
                                  valid={!errors.vehicleTypeId}
                                  invalid={
                                    touched.vehicleTypeId &&
                                    !!errors.vehicleTypeId
                                  }
                                  autoFocus={true}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.vehicleTypeId}
                                  // maxLength={8}
                                  // style={classes.input}
                                >
                                  <option selected />
                                  {vehicledata.map(e => (
                                    <option value={e.vehicleGroupId}>
                                      {e.name}
                                    </option>
                                  ))}
                                </Input>
                                <FormFeedback>
                                  {errors.vehicleTypeId}
                                </FormFeedback>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="trackingDeviceId">
                                  Tracking device
                                </Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="select"
                                  name="trackingDeviceId"
                                  id="trackingDeviceId"
                                  // placeholder="i.e. Company Car"
                                  // autoComplete="given-name"
                                  // valid={!errors.trackingDeviceId}
                                  // invalid={
                                  //   touched.trackingDeviceId &&
                                  //   !!errors.trackingDeviceId
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.code}
                                  // maxLength={8}
                                  // style={classes.input}
                                >
                                  <option selected />
                                  {trackingdata.map(e => (
                                    <option value={e.code}>
                                      {e.trackingDeviceId}
                                    </option>
                                  ))}
                                </Input>
                                {/* <FormFeedback>
                                  {errors.trackingDeviceId}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="vehicleGroupId">Group</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="select"
                                  name="vehicleGroupId"
                                  id="vehicleGroupId"
                                  // placeholder="i.e. Company Car"
                                  autoComplete="given-name"
                                  valid={!errors.vehicleGroupId}
                                  invalid={
                                    touched.vehicleGroupId &&
                                    !!errors.vehicleGroupId
                                  }
                                  autoFocus={true}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.vehicleGroupId}
                                  // maxLength={8}
                                  // style={classes.input}
                                >
                                  <option selected />
                                  {vehiclegroupdata.map(e => (
                                    <option value={e.vehicleGroupId}>
                                      {e.name}
                                    </option>
                                  ))}
                                </Input>
                                <FormFeedback>
                                  {errors.vehicleGroupId}
                                </FormFeedback>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="usedForJobs">Used for jobs</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio1"
                                    name="usedForJobs"
                                    value={true}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="usedForJobs"
                                  >
                                    Yes
                                  </Label>
                                </FormGroup>
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio2"
                                    name="usedForJobs"
                                    value={false}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="usedForJobs"
                                  >
                                    No
                                  </Label>
                                </FormGroup>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="make">Make</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="make"
                                  id="make"
                                  // placeholder="i.e. Company Car"
                                  // autoComplete="given-name"
                                  // valid={!errors.make}
                                  // invalid={
                                  //   touched.make &&
                                  //   !!errors.make
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.make}
                                  // maxLength={8}
                                  // style={classes.input}
                                />

                                {/* <FormFeedback>
                                  {errors.vehicleGroupId}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="usedForJobs">Fixed resource</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio3"
                                    name="fixedResource"
                                    value={true}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="fixedResource"
                                  >
                                    Yes
                                  </Label>
                                </FormGroup>
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio4"
                                    name="fixedResource"
                                    value={false}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="fixedResource"
                                  >
                                    No
                                  </Label>
                                </FormGroup>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="model">Model</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="model"
                                  id="model"
                                  // placeholder="i.e. Company Car"
                                  // autoComplete="given-name"
                                  // valid={!errors.model}
                                  // invalid={
                                  //   touched.model &&
                                  //   !!errors.model
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.model}
                                  // maxLength={8}
                                  // style={classes.input}
                                />
                                {/* <FormFeedback>
                                  {errors.model}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
                        </div>

                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Year</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="year"
                                  id="year"
                                  // placeholder="i.e. Company Car"
                                  // autoComplete="given-name"
                                  // valid={!errors.year}
                                  // invalid={
                                  //   touched.year &&
                                  //   !!errors.year
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.year}
                                  // maxLength={8}
                                  // style={classes.input}
                                />
                                {/* <FormFeedback>
                                  {errors.year}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
                        </div>


                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Odometer unit</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio5"
                                    name="odometerUnit"
                                    value={"kilometers"}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="odometerUnit"
                                  >
                                    Kilometers
                                  </Label>
                                </FormGroup>
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="radio6"
                                    name="odometerUnit"
                                    value={"miles"}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="odometerUnit"
                                  >
                                    Miles
                                  </Label>
                                </FormGroup>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
                        </div>


                        <div className='row' style={classes.divider}></div>
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

export default VehicleFuelCostAdd;
