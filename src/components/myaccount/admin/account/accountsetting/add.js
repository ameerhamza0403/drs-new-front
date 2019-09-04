import React, { Component, useState, useEffect } from "react";
import {  PostListingForAccountSetting } from "../shared/accountsetting";

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

let selectedFile = [];
let nameoffile = "";

let AddAccountSetting = props => {
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
    
    console.log(values)
    await PostListingForAccountSetting(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Name has to be at least 4 characters`)
    .required("Name is requierd"),

    addressLine1: Yup.string()
    .required("Address Line 1 is requierd"),
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
    type:"",
    name: "",
    value :"",
    module :"",
    accountId :8,
    isActive: false
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

  let [filen, setFilen] = useState(false);
  let handleFileSelect = event => {
    setFilen(false);

    return (selectedFile=event.target.files[0]), setFilen(true);

  };

  if (filen) {
    console.log("true")
    nameoffile = selectedFile.name;
  } else {
    nameoffile = "";
  }

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    setFilen(false);
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">Account</h3></ModalHeader>
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
                            <Label for="name">Your Company Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                          <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter Your Company Name"
                              autoComplete="given-name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <FormFeedback>{errors.code}</FormFeedback>
                            
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="addressLine1">Address Line 1</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                                id="addressLine1"
                                placeholder="Enter your Address Line 1"
                                type="text"
                                name="addressLine1"
                                autoComplete="given-name"
                                valid={!errors.addressLine1}
                                invalid={touched.addressLine1 && !!errors.addressLine1}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.addressLine1}
                              
                            />
                            
                            <FormFeedback>{errors.addressLine1}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="addressLine2">Address Line 2</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                                id="addressLine2"
                                placeholder="Enter your Address Line 2"
                                type="text"
                                name="addressLin2"
                                // autoComplete="given-name"
                                // valid={!errors.addressLine2}
                                // invalid={touched.addressLine2 && !!errors.addressLine2}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.addressLine2}
                              
                            />
                            
                            <FormFeedback>{errors.addressLine2}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="addressLine3">Address Line 3</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                                id="addressLine3"
                                placeholder="Enter your Address Line 3"
                                type="text"
                                // autoComplete="given-name"
                                // valid={!errors.addressLine3}
                                // invalid={touched.addressLine3 && !!errors.addressLine3}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="addressLine3"
                                value={values.addressLine3}
                            />
                            <FormFeedback>{errors.addressLine3}</FormFeedback>
                            
                           
                          </div>
                        </div>

                        

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="jobFooterText ">Default text for the job card footer</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                                id="jobFooterText "
                                placeholder="Enter your Footer Text"
                                type="text"
                                // autoComplete="given-name"
                                // valid={!errors.jobFooterText}
                                // invalid={touched.jobFooterText && !!errors.jobFooterText}
                                // autoFocus={true}
                                // required
                                value={values.jobFooterText }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="jobFooterText"
                                
                              
                            />
                            <FormFeedback>{errors.jobFooterText}</FormFeedback>
                            
                           
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            Url of your logo
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                          <Input
                              type="file"
                              name="logo"
                              id="name"
                              // placeholder="i.e. "
                              autoComplete="given-name"
                              // valid={!errors.reference}
                              // invalid={touched.reference && !!errors.reference}
                              // autoFocus={true}
                              // required
                              onChange={handleFileSelect}
                              // onBlur={handleBlur}
                              // value={values.reference}
                              //value={values.logo}
                            />
                            
                            <FormFeedback>{errors.logo}</FormFeedback>
                          </div>
                        </div>

                    
                        
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="isActive"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            
                            <input
                              name="isActive"
                              id="isActive"
                              valid={!errors.isActive}
                              invalid={touched.isActive && !!errors.isActive}
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

export default AddAccountSetting;
