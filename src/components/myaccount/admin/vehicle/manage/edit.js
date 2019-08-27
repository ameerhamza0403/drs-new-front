import React, { Component, useEffect, useState } from "react";
import {
  GetTrackingDeviceData
} from "..//shared/manage";
import ManageVehAttribute from './attribute';
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
import Select from "react-select";
// import "react-select/dist/react-select.min.css";
import 'react-select/dist/react-select.css';
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import { GetListingForcurrency } from "../../resources/shared/currency";
import { GetListingForVehicleType } from "../shared/vehicletype";
import { GetListingForVehicleGroups } from "../shared/vehiclegroup";
import { GetListingForVehicleChecktype } from "../shared/vehiclechecktype";
import {PutVehiclemanageDataById} from '../shared/manage';
let iconpack = "https://cdn.bigchangeapps.com/img/Map/cn/40/air-n.png";


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
  }
};

let EditVehicleManage = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    let newvalue = values;
    console.log(newvalue);
    await PutVehiclemanageDataById(props.IDforAPI, newvalue)
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
      isActive: true
    }
  ]);

  let [vehicledata, setVehicledata] = useState([
    {
      vehicleTypeId: 0,
      name: "",
      isActive: true
    }
  ]);
  let [trackingdata, setTrackingdata] = useState([
    {
      trackingDeviceId: 0,
      code: "",
      remarks: "",
      isActive: true
    }
  ]);
  let [vehiclegroupdata, setVehicleGroupdata] = useState([
    {
      vehicleGroupId: "",
      name: "",
      isActive: true
    }
  ]);

  let [vehchecktype, setVehiclechecktype] = useState([{
    vehicleCheckTypeId: 0,
    name: "",
    isActive: true
  }]);
  useEffect(() => {
    getvehchecktype();
    getcurrlist();
    getVehicletype();
    gettracking();
    getvehiclegroup();
  }, []);


  async function getvehchecktype() {
    const { data: vehchecktype } = await GetListingForVehicleChecktype();
    setVehiclechecktype(vehchecktype);
    vehchecktype.map((e, i) => {
      e.value = e.name;
      e.label = e.name;
    });
  }

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
  let multivehtype = [];
  function savevehchecktype(value) {
    multivehtype.push(value.name);
    // setInitialvalues(initialValues.vehicleCheckTypes=JSON.stringify(multivehtype));
    console.log(multivehtype);
  }


  function HandleSHR(str){
    let name='attributes';
    setInitialvalues({...initialValues, [name]:str});
  }

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

  let iconData = [
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack
  ];

  const [initialValues, setInitialvalues] = useState({
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
    icon: iconpack,
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

  const handleiconChange = event => {
    let name = "icon";
    let valofCod;
    valofCod = event.target.getAttribute("value");
    setInitialvalues({ ...initialValues, [name]: valofCod });
    handleOpenMT();
  };

  let [modal, setModal] = useState(true);
  let [modalMT, setModalMT] = useState(false);

  let handleOpen = () => {
    return setModal((modal=!modal));
  };

  let handleOpenMT = () => {
    return setModalMT((modalMT = !modalMT));
  };



  return (
    <div>

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
                                    <option value={e.vehicleTypeId}>
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

                        <div className="row" style={classes.divider} />
                        <br />
                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row mb-2">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Cost Per Mile</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <div className="row">
                                  <div className="col">
                                    <Input
                                      type="text"
                                      name="costPerMile"
                                      id="costPerMile"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.costPerMile}
                                      // invalid={
                                      //   touched.costPerMile &&
                                      //   !!errors.costPerMile
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.costPerMile}
                                      // maxLength={8}
                                      // style={classes.input}
                                    />
                                    {/* <FormFeedback>
                                  {errors.costPerMile}
                                </FormFeedback> */}
                                  </div>
                                  <div className="col">
                                    <Input
                                      type="select"
                                      name="costPerMile"
                                      id="costPerMile"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.costPerMile}
                                      // invalid={
                                      //   touched.costPerMile &&
                                      //   !!errors.costPerMile
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.costPerMile}
                                      // maxLength={8}
                                      // style={classes.input}
                                    >
                                      <option selected />
                                      {currency.map(e => (
                                        <option value={e.currencyId}>
                                          {e.code}
                                        </option>
                                      ))}
                                    </Input>
                                    {/* <FormFeedback>
                                  {errors.costPerMile}
                                </FormFeedback> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Cost Per Day</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <div className="row">
                                  <div className="col">
                                    <Input
                                      type="text"
                                      name="costPerDay"
                                      id="costPerDay"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.costPerDay}
                                      // invalid={
                                      //   touched.costPerDay &&
                                      //   !!errors.costPerDay
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.costPerDay}
                                      // maxLength={8}
                                      // style={classes.input}
                                    />
                                    {/* <FormFeedback>
                                  {errors.costPerDay}
                                </FormFeedback> */}
                                  </div>
                                  <div className="col">
                                    <Input
                                      type="select"
                                      name="costPerMile"
                                      id="costPerMile"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.costPerMile}
                                      // invalid={
                                      //   touched.costPerMile &&
                                      //   !!errors.costPerMile
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.costPerMile}
                                      // maxLength={8}
                                      // style={classes.input}
                                    >
                                      <option selected />
                                      {currency.map(e => (
                                        <option value={e.currencyId}>
                                          {e.code}
                                        </option>
                                      ))}
                                    </Input>
                                    {/* <FormFeedback>
                                  {errors.costPerMile}
                                </FormFeedback> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Select Icon</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <img
                                  src={initialValues.icon}
                                  onClick={handleOpenMT}
                                />
                                <Modal
                                  isOpen={modalMT}
                                  toggle={handleOpenMT}
                                  className={"modal-primary " + props.className}
                                >
                                  <ModalHeader toggle={handleOpenMT}>
                                    Note Type
                                  </ModalHeader>
                                  <ModalBody>
                                    <div className="container">
                                      <div className="row">
                                        {iconData.map(element => (
                                          <div className="col">
                                            <img
                                              src={element}
                                              style={classes.icon}
                                              value={element}
                                              onClick={handleiconChange}
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </ModalBody>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">CO2</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <div className="row">
                                  <div className="col">
                                    <Input
                                      type="text"
                                      name="cO2"
                                      id="cO2"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.cO2}
                                      // invalid={
                                      //   touched.cO2 &&
                                      //   !!errors.cO2
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.cO2}
                                      // maxLength={8}
                                      // style={classes.input}
                                    />
                                  </div>
                                  <div className="col">
                                    <FormGroup check inline className="radio">
                                      <Input
                                        className="form-check-input"
                                        type="radio"
                                        id="radio5"
                                        name="cO2Unit"
                                        value={0}
                                      />
                                      <Label
                                        check
                                        className="form-check-label"
                                        htmlFor="odometerUnit"
                                      >
                                        gram/km
                                      </Label>
                                    </FormGroup>
                                    <FormGroup check inline className="radio">
                                      <Input
                                        className="form-check-input"
                                        type="radio"
                                        id="radio6"
                                        name="cO2Unit"
                                        value={1}
                                      />
                                      <Label
                                        check
                                        className="form-check-label"
                                        htmlFor="cO2Unit"
                                      >
                                        kg/litre
                                      </Label>
                                    </FormGroup>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
                        </div>

                        <div className="row mb-3">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">
                                  Idling fuel consumption
                                </Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <div className="row">
                                  <div className="col">
                                    <Input
                                      type="text"
                                      name="idleFuelConsump"
                                      id="idleFuelConsump"
                                      // placeholder="i.e. Company Car"
                                      // autoComplete="given-name"
                                      // valid={!errors.idleFuelConsump}
                                      // invalid={
                                      //   touched.idleFuelConsump &&
                                      //   !!errors.idleFuelConsump
                                      // }
                                      // autoFocus={true}
                                      // required
                                      onChange={handleChange}
                                      // onBlur={handleBlur}
                                      value={values.idleFuelConsump}
                                      // maxLength={8}
                                      // style={classes.input}
                                    />
                                  </div>
                                  <div className="col">
                                    <Label for="idleFuelConsump">
                                      litre per minute
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="year">Max RPM</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="maxRPM"
                                  id="maxRPM"
                                  // placeholder="i.e. Company Car"
                                  // autoComplete="given-name"
                                  // valid={!errors.maxRPM}
                                  // invalid={
                                  //   touched.maxRPM &&
                                  //   !!errors.maxRPM
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.maxRPM}
                                  // maxLength={8}
                                  // style={classes.input}
                                />
                                {/* <FormFeedback>
                                  {errors.maxRPM}
                                </FormFeedback> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        </FormGroup>
                      <FormGroup>
                        <div className="row" style={classes.divider} />
                        <br />
                        <div className="row mb-3">
                          <div className="col-2 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                            <Label for="year">Attributes</Label>
                          </div>
                          <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8" >
                            <ManageVehAttribute shrvalue={HandleSHR} />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-2 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                            <Label for="year">Vehicle type for defects</Label>
                          </div>
                          <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                            {/* <Select
                              name="form-field-name2"
                              // value={vehchecktype}
                              options={vehchecktype}
                              onChange={savevehchecktype}
                              multi
                            /> */}
                            <Select
                              isMulti
                              // name="colors"
                              // className="basic-multi-select"
                              // classNamePrefix="select"
                              value={initialValues.vehicleCheckTypeId}
                              key={initialValues.vehicleCheckTypeId}
                              options={vehchecktype}
                              onChange={savevehchecktype}
                            />
                          </div>
                        </div>

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


export default EditVehicleManage;
