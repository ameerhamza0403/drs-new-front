import React, { Component, useState, useEffect } from "react";
import {  PostListingForWorkSheetQ } from "../../shared/worksheetquestion";
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

let AddWorkSheetQ = props => {
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
    console.log(values , props.idworksheet);
    await PostListingForWorkSheetQ(props.idworksheet,values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
        question: Yup.string()
        .min(4, `Question has to be at least 10 characters`)
        .required("Question is required"),
       
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
    worksheetQuestionId:0,
    worksheetId:props.idworksheet,
    question: "",
    questionType:"",
    answer:"",
    defaultAnswer:"",
    maxLength:0,
    notes:"",
    photoBW:false,
    mandatory:false,
    appears:false,
    atRisk:false,
    isConditional:false,
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">WorkSheet</h3></ModalHeader>
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="question">Question</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="text"
                              name="question"
                              id="question"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.question}
                              invalid={touched.question && !!errors.question}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.question}
                            />
                            <FormFeedback>{errors.question}</FormFeedback>
                           
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="natypeme">Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="Yes" 
                                onChange={handleChange}/>&nbsp;Yes/No &nbsp;&nbsp;
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="cost" 
                                onChange={handleChange}/>&nbsp;Cost &nbsp;&nbsp;
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="decimal" 
                                onChange={handleChange}/>&nbsp;Decimal &nbsp;&nbsp;
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="wholeNumber" 
                                onChange={handleChange}/>&nbsp;Whole Number &nbsp;&nbsp;
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="text" 
                                onChange={handleChange}/>&nbsp;Text 
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="list" 
                                onChange={handleChange}/>&nbsp;List &nbsp;&nbsp;
                              <input type="radio" 
                                name="questionType" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="photo" 
                                onChange={handleChange}/>&nbsp;Photo &nbsp;&nbsp;

                                
                            </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="mandatory">Mandatory</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                          <input
                              name="mandatory"
                              id="mandatory"
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
                              Answer Mandatory
                            </label>
                            <FormFeedback>{errors.active}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="appears">Visiblity</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                          <input
                              name="appears"
                              id="appers"
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
                              Appears on standard Job Card
                            </label>
                            <FormFeedback>{errors.active}</FormFeedback>
                            
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="defaultAnswer">Default Answer</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                              <input type="radio" 
                                name="defaultAnswer" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="no" 
                                onChange={handleChange}/>&nbsp;No &nbsp;&nbsp;
                              <input type="radio" 
                                name="defaultAnswer" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="yes" 
                                onChange={handleChange}/>&nbsp;Yes &nbsp;&nbsp;
                              <input type="radio" 
                                name="defaultAnswer" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="nodefaultanswer" 
                                onChange={handleChange}/>&nbsp;No Default Answer &nbsp;&nbsp;
                              

                                
                            </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="natypeme">Answer At Risk</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                          <input type="radio" 
                                name="atRisk" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="no" 
                                onChange={handleChange}/>&nbsp;No &nbsp;&nbsp;
                              <input type="radio" 
                                name="atRisk" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="yes" 
                                onChange={handleChange}/>&nbsp;Yes &nbsp;&nbsp;
                              <input type="radio" 
                                name="atRisk" 
                                valid={!errors.type} 
                                onBlur={handleBlur} 
                                required 
                                invalid={touched.type && !!errors.type}  
                                value="nodansweratrisk" 
                                onChange={handleChange}/>&nbsp;No Answer At Risk &nbsp;&nbsp;

                                
                            </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="defaultAnswer">Default Answer</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="text"
                              name="defaultAnswer"
                              id="defaultAnswer"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.answer}
                              invalid={touched.answer && !!errors.answer}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultAnswer}
                            />
                            <FormFeedback>{errors.answer}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="question">Answer At Risk</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="text"
                              name="atRisk"
                              id="atRisk"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.answeratrisk}
                              invalid={touched.answeratrisk && !!errors.answeratrisk}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.atRisk}
                            />
                            <FormFeedback>{errors.answeratrisk}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="maxLength">Max Numbers of Characters</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                            <Input
                              type="number"
                              name="maxLength"
                              id="maxLength"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.answeratrisk}
                              invalid={touched.answeratrisk && !!errors.answeratrisk}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.maxLength}
                            />
                            <FormFeedback>{errors.answeratrisk}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="appears">Multiple answers</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                          <input
                              name="appears"
                              id="appers"
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
                              Mutilple answers can be selected
                            </label>
                            <FormFeedback>{errors.active}</FormFeedback>
                            
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="photoBW">Document</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                          <input
                              name="photoBW"
                              id="photoBW"
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
                              Photo saved for black & white
                            </label>
                            <FormFeedback>{errors.active}</FormFeedback>
                            
                          </div>
                        </div>
 
                        
                        
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
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

export default AddWorkSheetQ;
