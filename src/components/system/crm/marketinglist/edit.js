import React, { Component, useState, useEffect } from "react";
import {
  PutCrmMarketingList,
  GetCrmMarketingListById
} from "../shared/marketinglist";
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
import "./add.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

let valofCod = "";

const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none",
    fontWeight: "normal"
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

let EditMarkType = props => {
  let [initialValues, setInitialValues] = useState({
    isActive: true
  });
  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PutCrmMarketingList(props.IDforAPI, values)
      .then(res => props.success())
      .catch(error => props.error());
    handleOpen();
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string().required("Name is required")
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

  let [modal, setModal] = useState(props.open);

  let handleOpen = () => {
    setModal((modal = !modal));
    setTimeout(() => {
      props.backmain(1);
    }, 100);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetCrmMarketingListById(
      props.IDforAPI
    );
    setInitialValues(initialValues);
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Marketing List</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize
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
                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Label for="name" style={classes.label}>
                            Name
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder=""
                            autoComplete={false}
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
                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                          <Label for="targetType" style={classes.label}>
                            Target Type
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                          <Input
                            type="select"
                            name="targetType"
                            id="targetType"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.targetType}
                            // invalid={touched.targetType && !!errors.targetType}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.targetType}
                          >
                            <option selected />
                            <option value={"Contact"}>{"Contact"}</option>
                            <option value={"Lead"}>{"Lead"}</option>
                          </Input>
                          {/* <FormFeedback>{errors.targetType}</FormFeedback> */}
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                          <Label for="description" style={classes.label}>
                            Description
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                          <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.description}
                            // invalid={touched.description && !!errors.description}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                          />
                          {/* <FormFeedback>{errors.description}</FormFeedback> */}
                        </div>
                      </div>
                    </FormGroup>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8"></div>
                      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <FormGroup>
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
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
            )}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditMarkType;
