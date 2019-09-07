import React, { Component, useState, useEffect } from "react";
import {  PostListingForTemplateUsage } from "../shared/templateusage";
import { GetListingForTemplateUsageType } from '../shared/templateusagetype';
import { GetListingForJobType } from '../../schedule/shared/jobtype';


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


let AddTemplateUsage = props => {
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

    let [usagetypedata, setusagetypedata] = useState([
    {
        name: "",
        isActive: true
    }
    ]);

    let [jobtypedata, setjobtypedata] = useState([
    {
        name: "",
        isActive: true
    }
    ]);

    useEffect(() => {
    getusagetype();
    getjobtype();
    }, []);

    async function getusagetype() {
    const { data: usagetypedata } = await GetListingForTemplateUsageType();
    console.log(usagetypedata);
    setusagetypedata(usagetypedata);
    }

    async function getjobtype() {
    const { data: jobtypedata } = await GetListingForJobType();
    console.log(jobtypedata);
    setjobtypedata(jobtypedata);
    }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values)
    await PostListingForTemplateUsage(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    // name: Yup.string()
    // .min(4, `Name has to be at least 4 characters`)
    // .required("Name is requierd"),
    // title: Yup.string()
    // .required("Title is requierd"),
    // subGroup: Yup.string()
    // .required("SubGroup is requierd"),
    // mainGroup: Yup.string()
    // .required("MainGroup is requierd"),

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
    templateId:0,
    defaultFormat: "",
    templateUsageTypeName :"",
    jobTypeName :"",
    documentTypeName :"None",
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">TemplateUsage</h3></ModalHeader>
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
                            <Label for="defaultAnswer">Default Format</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 mb-3">
                              <input type="radio"
                                name="defaultFormat"
                                // valid={!errors.type}
                                // onBlur={handleBlur}
                                // required
                                // invalid={touched.type && !!errors.type}
                                value="Email"
                                onChange={handleChange}/>&nbsp;Email &nbsp;&nbsp;
                              <input type="radio"
                                name="defaultFormat"
                                // valid={!errors.type}
                                // onBlur={handleBlur}
                                // required
                                // invalid={touched.type && !!errors.type}
                                value="PDF"
                                onChange={handleChange}/>&nbsp;PDF &nbsp;&nbsp;
                              <input type="radio"
                                name="defaultFormat"
                                // valid={!errors.type}
                                // onBlur={handleBlur}
                                // required
                                // invalid={touched.type && !!errors.type}
                                value="SMS"
                                onChange={handleChange}/>&nbsp;SMS &nbsp;&nbsp;



                            </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="templateUsageTypeName">Usage Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 mb-3">
                            <Input
                              type="select"
                              name="templateUsageTypeName"
                              id="templateUsageTypeName"

                            //   autoComplete="given-name"
                            //   valid={!errors.firstWorksheet}
                            //   invalid={touched.firstWorksheet && !!errors.firstWorksheet}
                            //   autoFocus={true}
                            //   required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.templateUsageTypeName}

                            >
                               <option selected />
                                  {usagetypedata.map(e => (
                                    <option value={e.templateUsageTypeName }>
                                      {e.name}
                                    </option>
                                  ))}
                            </Input>
                            <FormFeedback>{errors.templateUsageTypeName}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="jobTypeName">Job Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 mb-3">
                            <Input
                              type="select"
                              name="jobTypeName"
                              id="jobTypeName"

                            //   autoComplete="given-name"
                            //   valid={!errors.firstWorksheet}
                            //   invalid={touched.firstWorksheet && !!errors.firstWorksheet}
                            //   autoFocus={true}
                            //   required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.jobTypeName}

                            >
                               <option selected />
                                  {jobtypedata.map(e => (
                                    <option value={e.jobTypeName }>
                                      {e.name}
                                    </option>
                                  ))}
                            </Input>
                            <FormFeedback>{errors.templateUsageTypeName}</FormFeedback>

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

export default AddTemplateUsage;
