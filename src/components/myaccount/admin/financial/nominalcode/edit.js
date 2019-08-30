import { GetNominalCodeDataById, PutNominalCodeDataById } from "..//shared/nominalcode";
import React, { Component, useState, useEffect } from "react";
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

let EditNominalCode = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

    //Toast

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
    await PutNominalCodeDataById(props.IDforAPI, values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    code: Yup.string()
    .min(4, `Code has to be at least 4 characters`)
    .required("Nominal Code is requierd"),

    description: Yup.string()
    .min(4, `Description has to be at least 4 characters`)
    .required("Description is requierd")
        
        

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

  const [initialValues, setInitialValues] = useState({
    // name: "",
    // ctBackOffice:"",
    // ctResource:"",
    // ctBookingSite:"",
    // headerAnswer:"",
    // headerNotes:"",
    // sharing:"",
    // order:0,
    active: false
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
  let [modal, setModal] = useState(true);

  let handleOpen = () => {
    return (
      setModal((modal = false)),
      setTimeout(()=> props.cross(), 200)

    );
  };


  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetNominalCodeDataById(props.IDforAPI);
    console.log(initialValues);
    setInitialValues(initialValues)
  }




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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">NominalCode</h3></ModalHeader>
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
                            <Label for="code">Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="code"
                              id="code"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.code}
                              invalid={touched.code && !!errors.code}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                            />
                            <FormFeedback>{errors.code}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="code">Description</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="description"
                              id="description"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.description}
                              invalid={touched.description && !!errors.description}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            <FormFeedback>{errors.description}</FormFeedback>
                           
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultJobCard">Class</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="class"
                              id="class"
                              
                              autoComplete="given-name"
                              valid={!errors.class}
                              invalid={touched.class && !!errors.class}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.class}
                         
                              
                            >
                               <option value="A">A</option>
                               <option value="E">E</option>
                               <option value="L">L</option>
                               <option value="S">S</option>
                               <option value="R">R</option>
                               <option value="P">P</option>
                            </Input>
                            <FormFeedback>{errors.class}</FormFeedback>
                            
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="nominalType">Nominal Type</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="nominalType"
                              id="nominalType"
                              
                              autoComplete="given-name"
                              valid={!errors.nominalType}
                              invalid={touched.nominalType && !!errors.nominalType}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.nominalType}
                         
                              
                            >
                               <option value="Fixed Asset">Fixed Asset</option>
                               <option value="Expense">Expense</option>
                               <option value="Current Liability">Current Liability</option>
                               <option value="Capital (Source of funds)">Capital (Source of funds)</option>
                               <option value="Revenue">Revenue</option>
                               <option value="Purchase">Purchase</option>
                            </Input>
                            <FormFeedback>{errors.nominalType}</FormFeedback>
                            
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

export default EditNominalCode;
