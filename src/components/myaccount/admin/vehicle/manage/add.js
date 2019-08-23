import React, { Component, useState, useEffect } from "react";
import { PostListingForVehiclemanage } from "..//shared/manage";
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
  useEffect(() => {
    getcurrlist();
  }, []);

  async function getcurrlist() {
    const { data: currency } = await GetListingForcurrency();
    setCurrency(currency);
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
      costPerLitre: Yup.string()
        .min(1, `Fuel Cost has to be at least 1 characters`)
        .required("Fuel Cost is required"),
      currencyId: Yup.string()
        // .min(1, `Fuel Cost has to be at least 1 characters`)
        .required("Currency is required")
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
    registration: "",
    vehicleTypeId: 0,
    vehicleGroupId: 0,
    make: "",
    model: "",
    year: "",
    odometerUnit: "",
    refernce: "",
    trackingDeviceId: 0,
    usedForJobs: true,
    fixedResource: true,
    resourceId: 0,
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
                        <div className="row">
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="name">Fuel Cost</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="costPerLitre"
                                  id="name"
                                  // placeholder="i.e. Company Car"
                                  autoComplete="given-name"
                                  valid={!errors.costPerLitre}
                                  invalid={
                                    touched.costPerLitre &&
                                    !!errors.costPerLitre
                                  }
                                  autoFocus={true}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.costPerLitre}
                                  maxLength={8}
                                  // style={classes.input}
                                />
                                <FormFeedback>
                                  {errors.costPerLitre}
                                </FormFeedback>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="row">
                              <div className="col-3 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                                <Label for="name">Fuel Cost</Label>
                              </div>
                              <div className="col-8 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                                <Input
                                  type="text"
                                  name="costPerLitre"
                                  id="name"
                                  // placeholder="i.e. Company Car"
                                  autoComplete="given-name"
                                  valid={!errors.costPerLitre}
                                  invalid={
                                    touched.costPerLitre &&
                                    !!errors.costPerLitre
                                  }
                                  autoFocus={true}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.costPerLitre}
                                  maxLength={8}
                                  // style={classes.input}
                                />
                                <FormFeedback>
                                  {errors.costPerLitre}
                                </FormFeedback>
                              </div>
                            </div>
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

export default VehicleFuelCostAdd;
