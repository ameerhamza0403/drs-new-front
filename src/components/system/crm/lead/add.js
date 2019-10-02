import React, { Component, useState, useEffect } from "react";
import { PostCrmLead } from "..//shared/lead";
import { GetCrmContacts } from "../shared/contacts";
import "../../../../scss/customstyles/tabs.css";
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
import "react-select/dist/react-select.min.css";
import "../../../../scss/override/select.scss";
import { Spinner } from "reactstrap";

const classes = {
  linearprogress: {
    // backgroundColor: '#EE7647',
    // backgroundColor: "rgb(243, 153, 117)"
    marginLeft: "50%"
  },
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
    // color: "#999"
  }
};

let AddCrmLead = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(values.expectedSaleTime === undefined)) {
      if (values.expectedSaleTimemodified === undefined) {
        values.expectedSaleTime = `${
          values.expectedSaleTime
        }T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      }
      else{
        values.expectedSaleTime = `${
          values.expectedSaleTime
        }T${values.expectedSaleTimemodified}`
      }
    }
    delete values.expectedSaleTimemodified;
    console.log(values);
    await PostCrmLead(values)
      .then(res => props.success())
      .catch(error => props.error());
    props.backmain(1);
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
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

  useEffect(() => {
    settabledistatus((Tabledistatus = false));

    getlistapi();
  }, []);

  let [Parentcontact, setParentContact] = useState([]);

  let initialValues = {
    isActive: true
    // contactId: (props.check)?props.idforparent:0,
  };

  async function getlistapi() {
    settabledistatus((Tabledistatus = true));
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

  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
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
                  <Tabs
                    defaultActiveKey="general"
                    transition={false}
                    id="noanim-tab-example"
                    className={classes.myclass}
                  >
                    <Tab
                      eventKey="general"
                      title="General"

                      // onSelect={event => changeColor(event)}
                    >
                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="name" style={classes.label}>
                                Name
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
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
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="jobTitle" style={classes.label}>
                                Job Title
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="text"
                                name="jobTitle"
                                id="jobTitle"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.jobTitle}
                                // invalid={touched.jobTitle && !!errors.jobTitle}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.jobTitle}
                              />
                              {/* <FormFeedback>{errors.jobTitle}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="leadDate" style={classes.label}>
                                Lead Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="date"
                                name="leadDate"
                                id="leadDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.leadDate}
                                // invalid={touched.leadDate && !!errors.leadDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.leadDate}
                              />
                              {/* <FormFeedback>{errors.leadDate}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="topic" style={classes.label}>
                                Event Name
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="text"
                                name="topic"
                                id="topic"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.topic}
                                // invalid={touched.topic && !!errors.topic}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.topic}
                              />
                              {/* <FormFeedback>{errors.topic}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="status" style={classes.label}>
                                Status
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="status"
                                id="status"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.status}
                                // invalid={touched.status && !!errors.status}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                              >
                                <option selected />
                                <option value={"Open"}>{"Open"}</option>
                                <option value={"Close"}>{"Close"}</option>
                                <option value={"Disqualified"}>
                                  {"Disqualified"}
                                </option>
                                <option value={"Qualified"}>
                                  {"Qualified"}
                                </option>
                              </Input>
                              {/* <FormFeedback>{errors.status}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="businessPhone" style={classes.label}>
                                Business Phone
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="text"
                                name="businessPhone"
                                id="businessPhone"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.businessPhone}
                                // invalid={touched.businessPhone && !!errors.businessPhone}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.businessPhone}
                              />
                              {/* <FormFeedback>{errors.businessPhone}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="mobilePhone" style={classes.label}>
                                Mobile Phone
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="mobilePhone"
                                id="mobilePhone"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.mobilePhone}
                                // invalid={touched.mobilePhone && !!errors.mobilePhone}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobilePhone}
                              />
                              {/* <FormFeedback>{errors.mobilePhone}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="email" style={classes.label}>
                                Email
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.email}
                                // invalid={touched.email && !!errors.email}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              {/* <FormFeedback>{errors.email}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="contact" style={classes.label}>
                                Contact Type
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="contact"
                                id="contact"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.contact}
                                // invalid={touched.contact && !!errors.contact}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contact}
                              >
                                <option selected />
                                <option value={"Contact"}>{"Contact"}</option>
                                <option value={"Company Name"}>
                                  {"Company Name"}
                                </option>
                              </Input>
                              {/* <FormFeedback>{errors.contact}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="website" style={classes.label}>
                                Website
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="text"
                                name="website"
                                id="website"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.website}
                                // invalid={touched.website && !!errors.website}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.website}
                              />
                              {/* <FormFeedback>{errors.website}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="source" style={classes.label}>
                                Source
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="source"
                                id="source"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.source}
                                // invalid={touched.source && !!errors.source}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.source}
                              >
                                <option selected />
                                <option value={"Facebook"}>{"Facebook"}</option>
                                <option value={"Twitter"}>{"Twitter"}</option>
                                <option value={"Junk"}>{"Junk"}</option>
                                <option value={"Campaign"}>{"Campaign"}</option>
                              </Input>
                              {/* <FormFeedback>{errors.contact}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="considered" style={classes.label}>
                                Consider As
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="considered"
                                id="considered"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.considered}
                                // invalid={touched.considered && !!errors.considered}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.considered}
                              >
                                <option selected />
                                <option value={"Warm"}>{"Warm"}</option>
                                <option value={"Hot"}>{"Hot"}</option>
                                <option value={"Junk"}>{"Junk"}</option>
                              </Input>
                              {/* <FormFeedback>{errors.considered}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                          <Label for="address" style={classes.label}>
                            Address
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.address}
                            // invalid={touched.address && !!errors.address}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                          />
                          {/* <FormFeedback>{errors.address}</FormFeedback> */}
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                          <Label for="comment" style={classes.label}>
                            Comment
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <Input
                            type="textarea"
                            name="comment"
                            id="comment"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.comment}
                            // invalid={touched.comment && !!errors.comment}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comment}
                          />
                          {/* <FormFeedback>{errors.comment}</FormFeedback> */}
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="user" style={classes.label}>
                                User
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="user"
                                id="user"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.user}
                                // invalid={touched.user && !!errors.user}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.user}
                              />
                              {/* <FormFeedback>{errors.user}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="priority" style={classes.label}>
                                Priority
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="priority"
                                id="priority"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.priority}
                                // invalid={touched.priority && !!errors.priority}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.priority}
                              >
                                <option selected />
                                <option value={"Normal"}>{"Normal"}</option>
                                <option value={"Low"}>{"Low"}</option>
                                <option value={"Critical"}>{"Critical"}</option>
                                <option value={"Important"}>
                                  {"Important"}
                                </option>
                              </Input>
                              {/* <FormFeedback>{errors.considered}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="expectedSaleTime"
                                style={classes.label}
                              >
                                Expected Sale Time
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="date"
                                name="expectedSaleTime"
                                id="expectedSaleTime"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.expectedSaleTime}
                                // invalid={touched.expectedSaleTime && !!errors.expectedSaleTime}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expectedSaleTime}
                              />
                              {/* <FormFeedback>{errors.expectedSaleTime}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="time"
                                name="expectedSaleTimemodified"
                                id="expectedSaleTimemodified"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.expectedSaleTimemodified}
                                // invalid={touched.expectedSaleTimemodified && !!errors.expectedSaleTimemodified}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expectedSaleTimemodified}
                              />
                              {/* <FormFeedback>{errors.expectedSaleTimemodified}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="new" style={classes.label}>
                                New
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Input
                                type="checkbox"
                                name="new"
                                id="new"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.new}
                                // invalid={touched.new && !!errors.new}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.new}
                              />
                              &nbsp;&nbsp;&nbsp;
                              <Label for="new" style={classes.label}>
                                New
                              </Label>
                              {/* <FormFeedback>{errors.considered}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="existingContactPerson"
                                style={classes.label}
                              >
                                Contact Person
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Input
                                type="checkbox"
                                name="existingContactPerson"
                                id="existingContactPerson"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.existingContactPerson}
                                // invalid={touched.existingContactPerson && !!errors.existingContactPerson}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.existingContactPerson}
                              />
                              &nbsp;&nbsp;&nbsp;
                              <Label
                                for="existingContactPerson"
                                style={classes.label}
                              >
                                Existing
                              </Label>
                              {/* <FormFeedback>{errors.considered}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label
                                for="existingContact"
                                style={classes.label}
                              >
                                Contact
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Input
                                type="checkbox"
                                name="existingContact"
                                id="existingContact"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.existingContact}
                                // invalid={touched.existingContact && !!errors.existingContact}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.existingContact}
                              />
                              &nbsp;&nbsp;&nbsp;
                              <Label
                                for="existingContact"
                                style={classes.label}
                              >
                                Existing
                              </Label>
                              {/* <FormFeedback>{errors.considered}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
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
    );
  } else {
    Tabledisplay = (
      <div style={classes.linearprogress}>
        <Spinner type="grow" color="dark" />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardBody>{Tabledisplay}</CardBody>
      </Card>
    </div>
  );
};

export default AddCrmLead;
