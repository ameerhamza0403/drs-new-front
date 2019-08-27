import React, { Component, useState, useEffect } from "react";
import { PostListingForVehicleCheck } from "..//shared/vehiclecheck";
import { GetListingForVehicleChecktype } from "../shared/vehiclechecktype";
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

let AddVehicleCheck = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Tost

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
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
    await PostListingForVehicleCheck(values)
      .then(res => success(res.data.message))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      defectName: Yup.string()
        .min(4, `Defect name has to be at least 4 characters`)
        .required("Defect Name is required"),
        vehicleCheckTypeId: Yup.string()
        // .max(3, `Currency Code has to be at least 3 characters`)
        .required("Type Name is required")
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
    defectName: "",
    vehicleCheckTypeId: "",
    isActive: false,
    atRisk: false,
    requiresPhoto: false,
  };

  let [checktype, setChecktype] = useState([]);

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: checktype } = await GetListingForVehicleChecktype();
    setChecktype(checktype);
  }

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
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Vehicle Check</ModalHeader>
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
                            <Label for="name">Defect Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="defectName"
                              id="defectName"
                              placeholder="i.e. Is service Light Still off"
                              autoComplete="given-name"
                              valid={!errors.defectName}
                              invalid={
                                touched.defectName && !!errors.defectName
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defectName}
                            />
                            <FormFeedback>{errors.defectName}</FormFeedback>
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Vehicle Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="vehicleCheckTypeId"
                              id="vehicleCheckTypeId"
                              autoComplete="given-name"
                              valid={!errors.vehicleCheckTypeId}
                              invalid={touched.vehicleCheckTypeId && !!errors.vehicleCheckTypeId}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.vehicleCheckTypeId}
                            >
                              <option value="none">None</option>
                              {checktype.map(e => (
                                <option value={e.vehicleCheckTypeId}>
                                  {e.name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>{errors.vehicleCheckTypeId}</FormFeedback>
                            <br />
                            <Input
                              type="checkbox"
                              name="isActive"
                              id="isActive"
                              valid={!errors.isActive}
                              invalid={touched.isActive && !!errors.isActive}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.isActive}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              isActive
                            </label>
                            <br />
                            <Input
                              type="checkbox"
                              name="atRisk"
                              id="atRisk"
                              valid={!errors.atRisk}
                              invalid={touched.atRisk && !!errors.atRisk}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.atRisk}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              At Risk
                            </label>
                            <br />
                            <Input
                              type="checkbox"
                              name="requiresPhoto"
                              id="requiresPhoto"
                              valid={!errors.requiresPhoto}
                              invalid={touched.requiresPhoto && !!errors.requiresPhoto}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.requiresPhoto}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >Requires a photo if defect <br/>(compatible devices only)
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

export default AddVehicleCheck;
