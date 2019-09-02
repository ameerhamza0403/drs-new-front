import React, { Component, useState, useEffect } from "react";
import {  PostListingForJobType } from "..//shared/jobtype";
import { GetListingForWorkSheet } from "..//shared/worksheet";
import { GetListingForJobcategory } from "..//shared/jobcategory";
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

let AddJobType = props => {
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
    console.log(values);
    await PostListingForJobType(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  let [worksheetdata, setworksheetdata] = useState([
    {
      worksheetId: 0,
      name: "",
      active: true
    }
  ]);

  let [jobcategorydata, setjobcategorydata] = useState([
    {
      jobCategoryId: 0,
      name: "",
      active: true
    }
  ]);

  useEffect(() => {
    getworksheet();
    getjobcategory();
  }, []);

  async function getworksheet() {
    const { data: worksheetdata } = await GetListingForWorkSheet();
    console.log(worksheetdata);
    setworksheetdata(worksheetdata);
  }

  async function getjobcategory() {
    const { data: jobcategorydata } = await GetListingForJobcategory();
    console.log(jobcategorydata);
    setjobcategorydata(jobcategorydata);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
        name: Yup.string()
        .min(4, `Name has to be at least 4 characters`)

        .required("Name is required"),
        positiveResults: Yup.string()
        .min(4, `Positive Result has to be at least 4 characters`)
        .required("Positive Result is required"),
        nominalCode: Yup.string()
        .min(4, `Nominal Code has to be at least 4 characters`)
        .max(4, `Name has to be at least 4 characters`)
        .required("Nominal Code is required"),

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
    worksheetId:0,
    name: "",
    jobCardTitle :"",
    defaultJobCard :"",
    nominalCode :"",
    department :"",
    bigDataReport :true,
    reference :"",
    defaultJobDuraiton :0,
    durationDivision : true,
    worksheetOrder  : true,
    firstWorksheet : true,
    negativeJobResults  : true,
    jobCategoryId  : 0,
    jobCategoryName :"",
    positiveResults  :"",
    negativeResults  :"",
    stockCategories  :"",
    userSystems  :true,
    orderNumber :true,
    // referencePrefix :"",
    // referenceFormat :"",
    // nextNumber:0,
    active: false
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">JobType</h3></ModalHeader>
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
                            <Label for="name">Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultJobCard">Default Job Card</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="defaultJobCard"
                              id="defaultJobCard"

                              autoComplete="given-name"
                              valid={!errors.defaultJobCard}
                              invalid={touched.defaultJobCard && !!errors.defaultJobCard}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultJobCard}


                            >
                               <option value="">--Standard job card--</option>
                               <option value="Custom JobCard">Custom JobCard</option>
                               <option value="Before creating">Custom JobCard -Excl Auto Door</option>
                               <option value="EN 16005 2012 Compliance test Sheet-Sliding">EN 16005 2012 Compliance test Sheet-Sliding</option>
                               <option value="EN 16005 2012 Compliance test Sheet-Swing">EN 16005 2012 Compliance test Sheet-Swing</option>
                            </Input>
                            <FormFeedback>{errors.ctBackOffice}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="jobCardTitle">Job Card Title</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="jobCardTitle"
                              id="jobCardTitle"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.jobCardTitle}
                              invalid={touched.jobCardTitle && !!errors.jobCardTitle}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.jobCardTitle}
                            />
                            <FormFeedback>{errors.jobCardTitle}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="nominalCode">Nominal Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 mb-3">
                            <Input
                              type="text"
                              name="nominalCode"
                              id="nominalCode"

                              autoComplete="given-name"
                              valid={!errors.nominalCode}
                              invalid={touched.ctResource && !!errors.nominalCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.nominalCode}
                              />

                            <FormFeedback>{errors.nominalCode}</FormFeedback>

                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="department">Department</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 mb-3">
                            <Input
                              type="text"
                              name="department"
                              id="department"

                              autoComplete="given-name"
                              valid={!errors.department}
                              invalid={touched.department && !!errors.department}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.department}
                              />

                            <FormFeedback>{errors.department}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="bigDataReport">Big Data Report</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 mb-3">
                            <input
                              name="bigDataReport"
                              id="bigDataReport"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.bigDataReport}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Used in BigData report and Dashboard
                            </label>
                            <FormFeedback>{errors.ctResource}</FormFeedback>

                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="reference">Reference</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 mb-3">
                            <Input
                              type="text"
                              name="reference"
                              id="reference"

                              autoComplete="given-name"
                              valid={!errors.reference}
                              invalid={touched.reference && !!errors.reference}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.reference}
                              />

                            <FormFeedback>{errors.reference}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultJobDuraiton">Default Job Duration</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="number"
                              name="defaultJobDuraiton"
                              id="defaultJobDuraiton"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.defaultJobDuraiton}
                              invalid={touched.defaultJobDuraiton && !!errors.defaultJobDuraiton}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultJobDuraiton}
                            />
                            <FormFeedback>{errors.defaultJobDuraiton}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="durationDivision"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="durationDivision"
                              id="durationDivision"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.durationDivision}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Duration will be divided by the number of Staff allocated
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="firstWorksheet">Default Job Worksheets</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="firstWorksheet"
                              id="firstWorksheet"

                              autoComplete="given-name"
                              valid={!errors.firstWorksheet}
                              invalid={touched.firstWorksheet && !!errors.firstWorksheet}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstWorksheet}

                            >
                               <option selected />
                                  {worksheetdata.map(e => (
                                    <option value={e.worksheetId}>
                                      {e.name}
                                    </option>
                                  ))}
                            </Input>
                            <FormFeedback>{errors.firstWorksheet}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="worksheetOrder"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="worksheetOrder"
                              id="worksheetOrder"
                              valid={!errors.worksheetOrder}
                              invalid={touched.worksheetOrder && !!errors.worksheetOrder}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.worksheetOrder}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Worksheets need to be completed in order
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="firstWorksheet"
                              id="firstWorksheet"
                              valid={!errors.firstWorksheet}
                              invalid={touched.firstWorksheet && !!errors.firstWorksheet}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.firstWorksheet}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              First worksheet appears as soon as the job is started
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="negativeJobResults"
                              id="negativeJobResults"
                              valid={!errors.negativeJobResults}
                              invalid={touched.negativeJobResults && !!errors.negativeJobResults}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.negativeJobResults}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Negative job result removes mandatory function for worksheet questions
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="jobCategoryId">Default Job Category</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="jobCategoryId"
                              id="jobCategoryId"

                              autoComplete="given-name"
                              valid={!errors.jobCategoryId}
                              invalid={touched.jobCategoryId && !!errors.jobCategoryId}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.jobCategoryId}

                            >
                              <option selected />
                                {jobcategorydata.map(e => (
                                  <option value={e.jobCategoryId}>
                                    {e.name}
                                  </option>
                                ))}


                            </Input>
                            <FormFeedback>{errors.jobCategoryId}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="positiveResults">Positive results *</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="positiveResults"
                              id="positiveResults"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.positiveResults}
                              invalid={touched.positiveResults && !!errors.positiveResults}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.positiveResults}
                            />
                            <FormFeedback>{errors.positiveResults}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="negativeResults">Negative results</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="negativeResults"
                              id="negativeResults"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.negativeResults}
                              invalid={touched.negativeResults && !!errors.negativeResults}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.negativeResults}
                            />
                            <FormFeedback>{errors.negativeResults}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="stockCategories">Stock category concerned</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="stockCategories"
                              id="stockCategories"

                              autoComplete="given-name"
                              valid={!errors.stockCategories}
                              invalid={touched.stockCategories && !!errors.stockCategories}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.stockCategories}

                            >
                               <option value=""></option>
                               <option value="Folding Door">Folding Door</option>
                               <option value="Manual Door Parts">Manual Door Parts</option>
                               <option value="Roller Shutter">Roller Shutter</option>
                               <option value="Sliding Door">Sliding Door</option>
                               <option value="Swing Door">Swing Door</option>
                               <option value="Tools">Tools</option>


                            </Input>
                            <FormFeedback>{errors.stockCategories}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="ctBackOffice">Stock item will be...</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="ctBackOffice"
                              id="ctBackOffice"

                              autoComplete="given-name"
                              valid={!errors.ctBackOffice}
                              invalid={touched.ctBackOffice && !!errors.ctBackOffice}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ctBackOffice}

                            >
                               <option value=""></option>
                               <option value="Brought to job and left at location">Brought to job and left at location</option>
                               <option value="Brought to job and left taken back">Brought to job and left taken back</option>
                               <option value="Brought to job to swap with other stock item">Brought to job to swap with other stock item</option>
                               <option value="Taken from job location">Taken from job location</option>
                               <option value="Already on site and left at location">Already on site and left at location</option>


                            </Input>
                            <FormFeedback>{errors.ctBackOffice}</FormFeedback>

                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="userSystems">Systems</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="userSystems"
                              id="userSystems"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.userSystems}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Use systems with equipment
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="orderNumber">Order number</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="orderNumber"
                              id="orderNumber"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.orderNumber}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                               Force user to enter order number
                            </label>
                          </div>
                        </div>






                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">

                            <input
                              name="active"
                              id="active"
                              valid={!errors.active}
                              invalid={touched.active && !!errors.active}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.active}
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

export default AddJobType;
