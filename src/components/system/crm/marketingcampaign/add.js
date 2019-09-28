import React, { Component, useState, useEffect } from "react";
import { PostCrmMarkCampaign } from "..//shared/marketingcampaign";
import { GetCrmMarkType } from "..//shared/marktype";
import { GetListingForTemplate } from "../../../myaccount/admin/account/shared/template";
import { GetListingpgForResource } from "../../../myaccount/admin/resources/shared/addedit";
import { GetListingForActivityType } from "../../../myaccount/admin/contactnote/shared/activitytype";
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
    color: "#999"
  }
};

let AddCrmMarketingCampaings = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(values.startDate === undefined)) {
      if (values.startDatemodified === undefined) {
        values.startDate = `${values.startDate}T${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${new Date().getSeconds()}`;
      }
      else{
        values.startDate = `${
          values.startDate
        }T${values.startDatemodified}`
      }
    }
    if (!(values.endDate === undefined)) {
      if (values.endDatemodified === undefined) {
        values.endDate = `${values.endDate}T${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${new Date().getSeconds()}`;
      }
      else{
        values.endDate = `${
          values.endDate
        }T${values.endDatemodified}`
      }
    }
    if (!(values.proposedStartDate === undefined)) {
      if (values.proposedEndDatemodified === undefined) {
        values.proposedStartDate = `${
          values.proposedStartDate
        }T${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${new Date().getSeconds()}`;
      }
      else{
        values.proposedStartDate = `${
          values.proposedStartDate
        }T${values.proposedStartDatemodified}`
      }
    }
    if (!(values.proposedEndDate === undefined)) {
      if (values.proposedEndDatemodified === undefined) {
        values.proposedEndDate = `${
          values.proposedEndDate
        }T${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }:${new Date().getSeconds()}`;
      }
      else{
        values.proposedEndDate = `${
          values.proposedEndDate
        }T${values.proposedEndDatemodified}`
      }
    }
    delete values.startDatemodified;
    delete values.endDatemodified;
    delete values.proposedStartDatemodified;
    delete values.proposedEndDatemodified;
    console.log(values);
    await PostCrmMarkCampaign(values)
      .then(res => props.success())
      .catch(error => props.error());
    props.backmain(1);
    setSubmitting(false);
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

  useEffect(() => {
    settabledistatus((Tabledistatus = false));

    getlistapi();
  }, []);

  let [Parentcontact, setParentContact] = useState([]);

  let initialValues = {
    isActive: true
    // contactId: (props.check)?props.idforparent:0,
  };

  let [marketingtype, setmarketingtype] = useState([]);
  let [template, settemplate] = useState([]);
  let [resource, setresource] = useState([]);
  let [activity, setactivity] = useState([]);
  async function getlistapi() {
    const { data: marketingtype } = await GetCrmMarkType(0, 0);
    setmarketingtype(marketingtype);

    const { data: template } = await GetListingForTemplate(0, 0);
    settemplate(template);

    const { data: resource } = await GetListingpgForResource(0, 0);
    setresource(resource);

    const { data: activity } = await GetListingForActivityType(0, 0);
    setactivity(activity);

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
                              <Label
                                for="marketingCampaignTypeId"
                                style={classes.label}
                              >
                                Marketing Campaign Type
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="marketingCampaignTypeId"
                                id="marketingCampaignTypeId"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.marketingCampaignTypeId}
                                // invalid={touched.marketingCampaignTypeId && !!errors.marketingCampaignTypeId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.marketingCampaignTypeId}
                              >
                                <option selected />
                                {marketingtype.map(e => (
                                  <option value={e.marketingCampaignTypeId}>
                                    {e.name}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.marketingCampaignTypeId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="assignedResourceId"
                                style={classes.label}
                              >
                                Staff Assigned
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="assignedResourceId"
                                id="assignedResourceId"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.assignedResourceId}
                                // invalid={touched.assignedResourceId && !!errors.assignedResourceId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.assignedResourceId}
                              >
                                <option selected />
                                {resource.map(e => (
                                  <option value={e.resourceId}>{e.name}</option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.assignedResourceId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="templateId" style={classes.label}>
                                Template
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="templateId"
                                id="templateId"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.templateId}
                                // invalid={touched.templateId && !!errors.templateId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.templateId}
                              >
                                <option selected />
                                {template.map(e => (
                                  <option value={e.templateId}>{e.name}</option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.templateId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="activityType" style={classes.label}>
                                Activity Type
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="activityType"
                                id="activityType"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.activityType}
                                // invalid={touched.activityType && !!errors.activityType}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.activityType}
                              >
                                <option selected />
                                {activity.map(e => (
                                  <option value={e.name}>{e.name}</option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.activityType}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="status" style={classes.label}>
                                Status
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
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
                                <option value={"Active"}>{"Active"}</option>
                                <option value={"Planning"}>{"Planning"}</option>
                                <option value={"Inactive"}>{"Inactive"}</option>
                                <option value={"Complete"}>{"Complete"}</option>
                              </Input>
                              {/* <FormFeedback>{errors.templateId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="startDate" style={classes.label}>
                                Start Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="date"
                                name="startDate"
                                id="startDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.startDate}
                                // invalid={touched.startDate && !!errors.startDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startDate}
                              />
                              {/* <FormFeedback>{errors.startDate}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="time"
                                name="startDatemodified"
                                id="startDatemodified"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.startDatemodified}
                                // invalid={touched.startDatemodified && !!errors.startDatemodified}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startDatemodified}
                              />
                              {/* <FormFeedback>{errors.startDatemodified}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="endDate" style={classes.label}>
                                End Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-5 col-xl-5">
                              <Input
                                type="date"
                                name="endDate"
                                id="endDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.endDate}
                                // invalid={touched.endDate && !!errors.endDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.endDate}
                              />
                              {/* <FormFeedback>{errors.endDate}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="time"
                                name="endDatemodified"
                                id="endDatemodified"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.endDatemodified}
                                // invalid={touched.endDatemodified && !!errors.endDatemodified}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.endDatemodified}
                              />
                              {/* <FormFeedback>{errors.endDatemodified}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="proposedStartDate"
                                style={classes.label}
                              >
                                Proposed Start Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="date"
                                name="proposedStartDate"
                                id="proposedStartDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.proposedStartDate}
                                // invalid={touched.proposedStartDate && !!errors.proposedStartDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.proposedStartDate}
                              />
                              {/* <FormFeedback>{errors.proposedStartDate}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="time"
                                name="proposedStartDatemodified"
                                id="proposedStartDatemodified"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.proposedStartDatemodified}
                                // invalid={touched.proposedStartDatemodified && !!errors.proposedStartDatemodified}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.proposedStartDatemodified}
                              />
                              {/* <FormFeedback>{errors.proposedStartDatemodified}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label
                                for="proposedEndDate"
                                style={classes.label}
                              >
                                Proposed End Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-5 col-xl-5">
                              <Input
                                type="date"
                                name="proposedEndDate"
                                id="proposedEndDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.proposedEndDate}
                                // invalid={touched.proposedEndDate && !!errors.proposedEndDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.proposedEndDate}
                              />
                              {/* <FormFeedback>{errors.proposedEndDate}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
                              <Input
                                type="time"
                                name="proposedEndDatemodified"
                                id="proposedEndDatemodified"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.proposedEndDatemodified}
                                // invalid={touched.proposedEndDatemodified && !!errors.proposedEndDatemodified}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.proposedEndDatemodified}
                              />
                              {/* <FormFeedback>{errors.proposedEndDatemodified}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="expectedCost" style={classes.label}>
                                Expected Cost
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="number"
                                name="expectedCost"
                                id="expectedCost"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.expectedCost}
                                // invalid={touched.expectedCost && !!errors.expectedCost}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expectedCost}
                              />
                              {/* <FormFeedback>{errors.expectedCost}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label
                                for="expectedRevenue"
                                style={classes.label}
                              >
                                Expected Revenue
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="number"
                                name="expectedRevenue"
                                id="expectedRevenue"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.expectedRevenue}
                                // invalid={touched.expectedRevenue && !!errors.expectedRevenue}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expectedRevenue}
                              />
                              {/* <FormFeedback>{errors.expectedRevenue}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="customerGoal" style={classes.label}>
                                Customer Goal
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="number"
                                name="customerGoal"
                                id="customerGoal"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.customerGoal}
                                // invalid={touched.customerGoal && !!errors.customerGoal}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.customerGoal}
                              />
                              {/* <FormFeedback>{errors.customerGoal}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="user" style={classes.label}>
                                User
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
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
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="fiscalYear" style={classes.label}>
                                Fiscal Year
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="string"
                                name="fiscalYear"
                                id="fiscalYear"
                                placeholder="2018"
                                autoComplete={false}
                                // valid={!errors.fiscalYear}
                                // invalid={touched.fiscalYear && !!errors.fiscalYear}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fiscalYear}
                              />
                              {/* <FormFeedback>{errors.fiscalYear}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                          <Label for="objective" style={classes.label}>
                            Objective
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                          <Input
                            type="textarea"
                            name="objective"
                            id="objective"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.objective}
                            // invalid={touched.objective && !!errors.objective}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.objective}
                          />
                          {/* <FormFeedback>{errors.objective}</FormFeedback> */}
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                          <Label for="isActive" style={classes.label}>
                            Active
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.isActive}
                            defaultChecked={initialValues.isActive}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Label for="isActive" style={classes.label}>
                            Yes
                          </Label>
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

export default AddCrmMarketingCampaings;
