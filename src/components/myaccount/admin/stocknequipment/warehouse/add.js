import React, { Component, useState, useEffect } from "react";
import { PostListingForWareHouse } from "../shared/warehouse";
import { GetListingForStorageLocation } from '../shared/storagelocation';
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

let AddStorageLocation = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Tost

  useEffect(()=>{
    getlistapi();
  },[]);

  let [location, setLocation] = useState([]);
  async function getlistapi(){
    const {data: location} = await GetListingForStorageLocation(0,0);
    setLocation(location);
  }

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
    await PostListingForWareHouse(values)
      .then(res => success(res.data.message))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .required("Storage Location is required"),
        storageLocationId: Yup.string()
        .required("Location is required"),
        warehouseCode: Yup.string()
        .required("Code is required"),
        storageType: Yup.string()
        .required("Type is required"),
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

  let initialValues = {
    // name: "",
    isActive: true
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
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Warehouse</ModalHeader>
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
                            <Label for="name">WareHouse Name</Label>
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
                            <Label for="warehouseCode">Warehouse Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="warehouseCode"
                              id="warehouseCode"
                              placeholder=""
                              autoComplete="off"
                              valid={!errors.warehouseCode}
                              invalid={touched.warehouseCode && !!errors.warehouseCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.warehouseCode}
                            />
                            <FormFeedback>{errors.warehouseCode}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="storageType">Storage Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="storageType"
                              id="storageType"
                              placeholder=""
                              autoComplete="off"
                              valid={!errors.storageType}
                              invalid={touched.storageType && !!errors.storageType}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.storageType}
                            >
                              <option selected />
                              <option value={'Location'}>{'Location'}</option>
                              <option value={'Vehicle'}>{'Vehicle'}</option>
                            </Input>
                            <FormFeedback>{errors.storageType}</FormFeedback>
                          </div>
                        </div>


                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="storageLocationId">Storage Location</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="storageLocationId"
                              id="storageLocationId"
                              placeholder=""
                              autoComplete="off"
                              valid={!errors.storageLocationId}
                              invalid={touched.storageLocationId && !!errors.storageLocationId}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.storageLocationId}
                            >
                              <option selected />
                              {location.map(e=><option value={e.storageLocationId}>{e.name}</option>)}
                            </Input>
                            <FormFeedback>{errors.storageLocationId}</FormFeedback>
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

export default AddStorageLocation;