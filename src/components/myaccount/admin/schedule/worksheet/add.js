import React, { Component, useState, useEffect } from "react";
import {  PostListingForWorkSheet } from "..//shared/worksheet";
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

let AddWorkSheet = props => {
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
    await PostListingForWorkSheet(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
        name: Yup.string()
        .min(4, `Name has to be at least 4 characters`)
        .required("Name is required"),
        ctBackOffice: Yup.string()
        .required("Please select "),
        ctResource: Yup.string()
        .required("Please select"),
        ctBookingSite: Yup.string()
        .required("Please select"),
        headerAnswer: Yup.string()
        .min(4, `Header Answer has to be at least 4 characters`)
        .required("Header Answer is required"),
        headerNotes: Yup.string()
        .min(4, `Header Notes has to be at least 4 characters`)
        .required("Header Notes is required")

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
    name: "",
    ctBackOffice:"",
    ctResource:"",
    ctBookingSite:"",
    headerAnswer:"",
    headerNotes:"",
    sharing:"",
    order:0,
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">WorkSheet</h3></ModalHeader>
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="name">Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="ctBackOffice">Completion time for back office</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="select"
                              name="ctBackOffice"
                              id="ctBackOffice"

                              autoComplete="given-name"
                              // valid={!errors.ctBackOffice}
                              // invalid={touched.ctBackOffice && !!errors.ctBackOffice}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ctBackOffice}

                            >
                               <option value="">N/A</option>
                               <option value="At any time">At any time</option>
                               <option value="Before creating">Before creating</option>
                               <option value="Before scheduling">Before scheduling</option>
                               <option value="Before sending">Before sending</option>
                               <option value="After job completion">After job completion</option>
                            </Input>
                            <FormFeedback>{errors.ctBackOffice}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="extensions">Completion time for resource</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="select"
                              name="ctResource"
                              id="ctResource"

                              autoComplete="given-name"
                              // valid={!errors.ctResource}
                              // invalid={touched.ctResource && !!errors.ctResource}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ctResource}
                              >
                                <option value="">N/A</option>
                                <option value="At any time">At any time</option>
                                <option value="Before driving to the job">Before driving to the job</option>
                                <option value="Before starting the job">Before starting the job</option>
                                <option value="Before completing the job">Before completing the job</option>
                                <option value="After completing the job">After completing the job</option>
                           </Input>
                            <FormFeedback>{errors.ctResource}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="email">Completion time on booking site</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="select"
                              name="ctBookingSite"
                              id="ctBookingSite"

                              autoComplete="given-name"
                              // valid={!errors.ctBookingSite}
                              // invalid={touched.ctBookingSite && !!errors.ctBookingSite}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ctBookingSite}
                              >
                                <option value="">N/A</option>
                                <option value="Before scheduling">Before scheduling</option>
                                <option value="Before starting">Before starting</option>
                                <option value="After job completion">After job completion</option>
                            </Input>
                            <FormFeedback>{errors.ctBookingSite}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="headerAnswer">Job card header for "Answer"</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="text"
                              name="headerAnswer"
                              id="headerAnswer"
                              placeholder=""
                              autoComplete="given-name"
                              // valid={!errors.headerAnswer}
                              // invalid={touched.headerAnswer && !!errors.headerAnswer}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.headerAnswer}
                            />
                            <FormFeedback>{errors.headerAnswer}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="headerNotes">Job card header for "Notes"</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="text"
                              name="headerNotes"
                              id="headerNotes"
                              placeholder=""
                              autoComplete="given-name"
                              // valid={!errors.headerNotes}
                              // invalid={touched.headerNotes && !!errors.headerNotes}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.headerNotes}
                            />
                            <FormFeedback>{errors.headerNotes}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="sharing">Sharing</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">

                            <input
                              name="sharing"
                              id="sharing"
                              // valid={!errors.sharing}
                              // invalid={touched.sharing && !!errors.sharing}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.sharing}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              share with job contractors
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">

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

export default AddWorkSheet;
