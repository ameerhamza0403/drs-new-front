import React, { Component, useState, useEffect } from "react";
import {
  GetCrmNotesActivityById,
  PutCrmNotesActivity
} from "..//shared/notesactivity";
import { GetListingForActivityType } from "../../../myaccount/admin/contactnote/shared/activitytype";
import { GetCrmNotes } from "../shared/notes";
import '../../../../scss/customstyles/tabs.css';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
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
import { Spinner } from "reactstrap";
import Slider from "@material-ui/core/Slider";

const classes = {
  linearprogress: {
    // backgroundColor: '#EE7647',
    // backgroundColor: "rgb(243, 153, 117)"
    marginLeft: "45%"
  },
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
  },
  notes: {
    marginLeft: "45px"
  },
  makeshow: {
    color: "#bbbfbe",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  validate: {
    width: "100%",
    marginTop: "0.25rem",
    fontSize: "80%",
    color: "#dc3545"
  }
};

let progress = 0;
let EditNotes = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    values.progress = progress;
    values.dueDate = `${values.dueDate}T${values.dueDatemodified}`;
    delete values.dueDatemodified;
    values.completionDate = `${values.completionDate}T${values.completionDatemodified}`;
    delete values.completionDatemodified;
    values.activityDate = `${values.activityDate}T${values.activityDatemodified}`;
    delete values.activityDatemodified;
    await PutCrmNotesActivity(props.IDforAPI, values)
      .then(res => props.success())
      .catch(error => props.error());
    props.backmain(1);
    setSubmitting(false);
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

  let [activitytype, setActivitytype] = useState([]);
  let [initialValues, setInitialValues] = useState({
    name: "",
    // imagePath: "",
    // order: 0,
    isActive: true
  });

  let [Tabledistatus, settabledistatus] = useState(false);
  useEffect(() => {
    settabledistatus(false);
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetCrmNotesActivityById(
      props.IDforAPI
    );
    setInitialValues(initialValues);

    const { data: activitytype } = await GetListingForActivityType(0, 0);
    setActivitytype(activitytype);

    initialValues.dueDatemodified = initialValues.dueDate.substr(
      11,
      initialValues.dueDate.length - 4
    );
    initialValues.dueDate = initialValues.dueDate.substr(
      0,
      initialValues.dueDate.length - 9
    );

    initialValues.completionDatemodified = initialValues.completionDate.substr(
      11,
      initialValues.completionDate.length - 4
    );
    initialValues.completionDate = initialValues.completionDate.substr(
      0,
      initialValues.completionDate.length - 9
    );

    initialValues.activityDatemodified = initialValues.activityDate.substr(
      11,
      initialValues.activityDate.length - 4
    );
    initialValues.activityDate = initialValues.activityDate.substr(
      0,
      initialValues.activityDate.length - 9
    );

    settabledistatus(true);
  }

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

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );

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



  if (Tabledistatus) {
    Tabledisplay = (
      <div>
      <Card>
        <CardBody>
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
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
                            <Label for="completionDate" style={classes.label}>
                              Completion Date
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="date"
                              name="completionDate"
                              id="completionDate"
                              // placeholder=""
                              // autoComplete={false}
                              // valid={!errors.completionDate}
                              // invalid={touched.completionDate && !!errors.completionDate}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.completionDate}
                            />
                            {/* <FormFeedback>{errors.completionDate}</FormFeedback> */}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="time"
                              name="completionDatemodified"
                              id="completionDatemodified"
                              // placeholder=""
                              // autoComplete={false}
                              // valid={!errors.completionDatemodified}
                              // invalid={touched.completionDatemodified && !!errors.completionDatemodified}
                              // autoFocus={true}
                              // required
                              onChange={e => {
                                values.completionDatemodified = `${values.completionDate}T${e.target.value}`;
                              }}
                              onBlur={handleBlur}
                              // value={values.completionDatemodified}
                            />
                            {/* <FormFeedback>{errors.completionDatemodified}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="activityDate" style={classes.label}>
                              Activity Date
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="date"
                              name="activityDate"
                              id="activityDate"
                              // placeholder=""
                              // autoComplete={false}
                              // valid={!errors.activityDate}
                              // invalid={touched.activityDate && !!errors.activityDate}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.activityDate}
                            />
                            {/* <FormFeedback>{errors.activityDate}</FormFeedback> */}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="time"
                              name="activityDatemodified"
                              id="activityDatemodified"
                              // placeholder=""
                              // autoComplete={false}
                              // valid={!errors.activityDatemodified}
                              // invalid={touched.activityDatemodified && !!errors.activityDatemodified}
                              // autoFocus={true}
                              // required
                              onChange={e => {
                                values.activityDatemodified = `${values.activityDate}T${e.target.value}`;
                              }}
                              onBlur={handleBlur}
                              // value={values.activityDate}
                            />
                            {/* <FormFeedback>{errors.activityDate}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="subject" style={classes.label}>
                              Subject*
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="text"
                              name="subject"
                              id="subject"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.subject}
                              // invalid={
                              //   touched.subject &&
                              //   !!errors.subject
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.subject}
                            />
                            {/* <FormFeedback>{errors.subject}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="comment" style={classes.label}>
                              Comment
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                            <Label for="callWith" style={classes.label}>
                            Call With
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="text"
                              name="callWith"
                              id="callWith"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.callWith}
                              // invalid={
                              //   touched.callWith &&
                              //   !!errors.callWith
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.callWith}
                            />
                            {/* <FormFeedback>{errors.callWith}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="primaryEmail" style={classes.label}>
                            Primary Email
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="text"
                              name="primaryEmail"
                              id="primaryEmail"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.primaryEmail}
                              // invalid={
                              //   touched.primaryEmail &&
                              //   !!errors.primaryEmail
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.primaryEmail}
                            />
                            {/* <FormFeedback>{errors.primaryEmail}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="callDirection" style={classes.label}>
                            Call Direction
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="select"
                              name="callDirection"
                              id="callDirection"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.callDirection}
                              // invalid={
                              //   touched.callDirection &&
                              //   !!errors.callDirection
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.callDirection}
                              >
                              <option selected />
                              <option value={'outgoing'}>{'outgoing'}</option>
                              <option value={'incoming'}>{'incoming'}</option>
                            </Input>
                            {/* <FormFeedback>{errors.callDirection}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="status" style={classes.label}>
                            Status
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="select"
                              name="status"
                              id="status"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.status}
                              // invalid={
                              //   touched.status &&
                              //   !!errors.status
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.status}
                            >
                              <option selected />
                              <option value='Open'>{'Open'}</option>
                              <option value='Completed'>{'Completed'}</option>
                              <option value='Cancelled'>{'Cancelled'}</option>
                            </Input>
                            {/* <FormFeedback>{errors.status}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="priority" style={classes.label}>
                            Priority
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Input
                              type="select"
                              name="priority"
                              id="priority"
                              placeholder=""
                              autoComplete={false}
                              // valid={!errors.priority}
                              // invalid={
                              //   touched.priority &&
                              //   !!errors.priority
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.priority}
                            >
                              <option selected />
                              <option value='Normal'>{'Normal'}</option>
                              <option value='High'>{'High'}</option>
                            </Input>
                            {/* <FormFeedback>{errors.status}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-1">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="user" style={classes.label}>
                              Progress
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Slider
                              defaultValue={initialValues.progress}
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

                      <div className="row">
                        <div className="col-2 col-sm-2 col-md-4 col-lg-9 col-xl-10"></div>
                        <div className="col-8 col-sm-8 col-md-6 col-lg-3 col-xl-2">
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
                              onClick={() => props.backmain(1)}
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
          </div>
        </CardBody>
      </Card>
    </div>
    );
  } else {
    Tabledisplay = (
      <div style={classes.linearprogress}>
        <Spinner type="grow" color="dark" />
      </div>
    );
  }

  return <div>{Tabledisplay}</div>;
};

export default EditNotes;
