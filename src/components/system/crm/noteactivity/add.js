import React, { Component, useState, useEffect } from "react";
import { PostFileUpload, PostCrmNotesActivity } from "..//shared/notesactivity";
import { GetListingForActivityType } from "../../../myaccount/admin/contactnote/shared/activitytype";
import { GetCrmNotes } from "../shared/notes";
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
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Formik } from "formik";
import * as Yup from "yup";
import Slider from "@material-ui/core/Slider";

const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
  validate: {
    width: "100%",
    marginTop: "0.25rem",
    fontSize: "80%",
    color: "#dc3545"
  },
  label: {
    fontSize: "12px",
    color: "#999"
  }
};

let progress = 0;
let AddNotesActivity = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    values.progress = progress;
    values.dueDate = values.dueDatemodified;
    delete values.dueDatemodified;
    console.log(values);
    await PostCrmNotesActivity(values)
      .then(res => props.success())
      .catch(error => props.error());
    setSubmitting(false);
    handleOpen();
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      dueDate: Yup.string().required("Date is required"),
      user: Yup.string().required("User is required"),
      activityTypeId: Yup.string().required("Type is required")
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

  let [note, setNote] = useState([]);
  let [activitytype, setActivitytype] = useState([]);
  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {

    const { data: activitytype } = await GetListingForActivityType(0, 0);
    setActivitytype(activitytype);
    //Multi Select Code  asset type
    // assettype.map((e, i) => {
    //   var obj = {};
    //   obj["label"] = e.name;
    //   obj["value"] = e.customerAssetTypeId;
    //   if (i === 0) {
    //     optiontype[0] = obj;
    //   } else {
    //     optiontype.push(obj);
    //   }
    // });
  }

  const initialValues = {
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
  const marks = [
    {
      value: 0,
      label: "0%"
    },
    {
      value: 100,
      label: "100%"
    }
  ];

  function valuetext(value) {
    progress = value;
    return `${value}%`;
  }

  let [modal, setModal] = useState(true);

  let handleOpen = () => {
    if (modal === true) {
      setTimeout(() => {
        props.backmain(1);
      }, 300);
    }
    return setModal((modal = !modal));
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="md"
      >
        <ModalHeader toggle={handleOpen}>Activity</ModalHeader>
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
                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="user" style={classes.label}>
                              Web User
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="text"
                              name="user"
                              id="user"
                              placeholder=""
                              autoComplete={false}
                              valid={!errors.user}
                              invalid={touched.user && !!errors.user}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user}
                            ></Input>
                            <FormFeedback>{errors.user}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="activityTypeId" style={classes.label}>
                              Activity Type
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="select"
                              name="activityTypeId"
                              id="activityTypeId"
                              placeholder=""
                              autoComplete={false}
                              valid={!errors.activityTypeId}
                              invalid={
                                touched.activityTypeId &&
                                !!errors.activityTypeId
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.activityTypeId}
                            >
                              <option selected></option>
                              {activitytype.map(e => (
                                <option value={e.activityTypeId}>
                                  {e.name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>{errors.user}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="dueDate" style={classes.label}>
                              Due Date
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="date"
                              name="dueDate"
                              id="dueDate"
                              // placeholder=""
                              autoComplete={false}
                              valid={!errors.dueDate}
                              invalid={touched.dueDate && !!errors.dueDate}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dueDate}
                            />
                            <FormFeedback>{errors.dueDate}</FormFeedback>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="time"
                              name="dueDatemodified"
                              id="dueDatemodified"
                              // placeholder=""
                              // autoComplete={false}
                              // valid={!errors.dueDate}
                              // invalid={touched.dueDate && !!errors.dueDate}
                              // autoFocus={true}
                              // required
                              onChange={e => {
                                values.dueDatemodified = `${values.dueDate}T${e.target.value}`;
                              }}
                              onBlur={handleBlur}
                              // value={values.dueDate}
                            />
                            {/* <FormFeedback>{errors.dueDate}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="comment" style={classes.label}>
                              Comment
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="textarea"
                              name="comment"
                              id="comment"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.comment}
                              // invalid={
                              //   touched.comment &&
                              //   !!errors.comment
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.comment}
                            />
                            {/* <FormFeedback>
                                        {errors.comment}
                                      </FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="user" style={classes.label}>
                              Progress
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Slider
                              defaultValue={0}
                              getAriaValueText={valuetext}
                              aria-labelledby="discrete-slider-always"
                              step={1}
                              marks={marks}
                              valueLabelDisplay="on"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <br />

                      <ModalFooter>
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
                            onClick={() => {
                              handleOpen();
                              setTimeout(() => {
                                props.backmain(1);
                              }, 100);
                            }}
                            style={classes.button}
                          >
                            Cancel
                          </Button>
                        </FormGroup>
                      </ModalFooter>
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

export default AddNotesActivity;
