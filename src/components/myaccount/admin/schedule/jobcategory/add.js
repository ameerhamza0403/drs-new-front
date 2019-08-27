import { PostListingForJobcategory } from "..//shared/jobcategory";
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
    width: "10px",
    cursor: "pointer",
    float: "left"
    // marginTop: '10px',
    // marginLeft: '5px',
  }
};

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

  let AddJobCategory = (props) => {
    // getModalStyle is not a pure function, we roll the style only on the first render
  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PostListingForJobcategory(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }



  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .min(4, `Job Category has to be at least 4 characters`)
        .required("Job Category is required"),
      visiblity:Yup.string().required("please select one radio button")
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
    visiblity:"",
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
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">Job Category</h3></ModalHeader>
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
                            <Label for="name">Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="i.e. Manager"
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
                        <br />
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Visiblity</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <input type="radio"
                                name="visiblity"
                                valid={!errors.name}
                                onBlur={handleBlur}
                                required
                                invalid={touched.name && !!errors.name}
                                value="Job"
                                onChange={handleChange}/>Job &nbsp;&nbsp;&nbsp;
                              <input type="radio"
                                name="visiblity"
                                valid={!errors.name}
                                onBlur={handleBlur}
                                required
                                invalid={touched.name && !!errors.name}
                                value="Group"
                                onChange={handleChange}/>Group &nbsp;&nbsp;&nbsp;
                              <input type="radio"
                                name="visiblity"
                                valid={!errors.name}
                                onBlur={handleBlur}
                                required
                                invalid={touched.name && !!errors.name}
                                value="Either"
                                onChange={handleChange}/>Both &nbsp;&nbsp;&nbsp;

                                <br />
                                <br />
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

export default AddJobCategory;
