import React, { Component, useState, useEffect } from "react";
import { PostCrmSalesOpp } from "..//shared/salesopp";
import { GetCrmContacts } from "../shared/contacts";
import ListingNoteActivty from "../noteactivity/listing";
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
import { Divider } from "@material-ui/core";
import ListingNotes from "./listing";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Formik } from "formik";
import * as Yup from "yup";
import { GetCrmNotes } from "../shared/notes";
import {
  GetCrmContactPerson,
  GetPersonCrmContactById
} from "../shared/contactperson";
import { GetCrmLead } from "../shared/lead";
import { GetListingForcurrency } from "../../../myaccount/admin/resources/shared/currency";
import { GetListingForSalesOpportunityStage } from "../../../myaccount/admin/financial/shared/salesopportunitystage";
import { GetListingForSaleProb } from "../../../myaccount/admin/financial/shared/saleprobiltiy";
import { GetListingForLocation } from "../../../myaccount/admin/stocknequipment/shared/location";
import { GetCrmMarkCampaign } from "../shared/marketingcampaign";
import { GetListingForNote } from "../../../myaccount/admin/contactnote/shared/notetype";
import { Spinner } from "reactstrap";
import AddStockItem from "./addstock";

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
    fontSize: "12px"
    // color: "#999"
  }
};

// let dialogevent = "";
// let dialogueContent = "";
let AddSales = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    let itemarr = [];
    items.map(e => {
      itemarr.push(e.item);
    });
    values.salesOpportunityLines = itemarr;
    console.log(values);
    await PostCrmSalesOpp(values)
      .then(res => props.success())
      .catch(error => props.error());
    setSubmitting(false);
    props.backmain(1);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      // name: Yup.string().required("Name is required"),
      locationId: Yup.string().required("Location is required"),
      topic: Yup.string().required("Topic is required"),
      currencyCode: Yup.string().required("Currency is required"),
      status: Yup.string().required("Status is required"),
      type: Yup.string().required("Type is required")
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
  let [stockitem, setstockitem] = useState([]);
  let [notetype, setnotetype] = useState([]);
  let [vehicle, setvehicle] = useState([]);
  let [resource, setresource] = useState([]);
  let [asset, setasset] = useState([]);
  let [note, setnote] = useState([]);
  let [person, setperson] = useState([]);
  let [personfield, setPersonFiled] = useState([]);
  let [leadfield, setLeadField] = useState([]);
  let [currency, setcurrency] = useState([]);
  let [mktCamp, setMktCamp] = useState([]);
  let [salestage, setsalestage] = useState([]);
  let [salesprob, setsalesprob] = useState([]);
  let [location, setlocation] = useState([]);
  let [contactfield, setContactField] = useState({
    contactName: ""
  });

  let [initialValues, setInitialValues] = useState({
    isActive: true
  });
  async function getlistapi() {
    const { data: personfield } = await GetCrmContactPerson(0, 0);
    setPersonFiled(personfield);

    const { data: leadfield } = await GetCrmLead(0, 0);
    setLeadField(leadfield);

    const { data: currency } = await GetListingForcurrency(0, 0);
    setcurrency(currency);

    const { data: mktCamp } = await GetListingForSalesOpportunityStage(0, 0);
    setMktCamp(mktCamp);

    const { data: salesprob } = await GetListingForSaleProb(0, 0);
    setsalesprob(salesprob);

    const { data: salestage } = await GetCrmMarkCampaign(0, 0);
    setsalestage(salestage);

    const { data: location } = await GetListingForLocation(0, 0);
    setlocation(location);

    if (props.noteType === "item") {
      const { data: stockitem } = await GetCrmContacts(0, 0);
      setstockitem(stockitem);
      if (props.check) {
        initialValues.itemId = props.idforparent;
      }
    } else if (props.noteType === "person") {
      const { data: person } = await GetCrmContactPerson(0, 0);
      setperson(person);
      if (props.check) {
        initialValues.contactPersonId = props.idforparent;
      }
    }

    console.log(initialValues);
    settabledistatus((Tabledistatus = true));

    // console.log(initialValues)
  }

  let [items, setItems] = useState([]);
  let getitems = (item, arr) => {
    if (item === "add") {
      let obj = [];
      obj = items;
      obj.push(arr);
      setItems((items = obj));
    } else if (item === "delete") {
      let obj = [];
      obj = items;
      items.map((e, i) => {
        if (e.id === arr) {
          delete obj[i];
        }
      });
      setItems((items = obj));
    }
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
                      disabled={false}
                      title="General"
                      // onSelect={event => changeColor(event)}
                    >
                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="locationId " style={classes.label}>
                                Location
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="locationId"
                                id="locationId"
                                placeholder=""
                                autoComplete={false}
                                valid={!errors.locationId}
                                invalid={
                                  touched.locationId && !!errors.locationId
                                }
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.locationId}
                              >
                                <option selected />
                                {location.map(e => (
                                  <option value={e.locationId}>{e.name}</option>
                                ))}
                              </Input>
                              <FormFeedback>{errors.locationId}</FormFeedback>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                        </div>
                      </div>

                      <br />

                      <Divider />
                      <br />
                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                          <Label for="contactPersonId" style={classes.label}>
                            Contact Person
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <Input
                            type="select"
                            name="contactPersonId"
                            id="contactPersonId"
                            placeholder=""
                            // valid={!errors.locationId}
                            // invalid={touched.locationId && !!errors.locationId}
                            // autoFocus={true}
                            // required
                            onChange={async e => {
                              handleChange(e);
                              const {
                                data: contactfield
                              } = await GetPersonCrmContactById(e.target.value);
                              setContactField(contactfield);
                            }}
                            onBlur={handleBlur}
                            value={values.contactPersonId}
                          >
                            <option selected></option>
                            {personfield.map(e => (
                              <option value={e.contactPersonId}>
                                {e.firstName}
                              </option>
                            ))}
                          </Input>
                          {/* <FormFeedback>{errors.locationId}</FormFeedback> */}
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="documentCode" style={classes.label}>
                                Contact
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              {/* <p
                                 style={{
                                   color: "#EE7647",
                                   fontStyle: "italic",
                                   fontWeight: "bold"
                                 }}
                               >
                               {`"${contactfield.contactName}"`}
                                  </p> */}
                              <Input
                                type="text"
                                value={contactfield.contactName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                          <Label for="topic " style={classes.label}>
                            Topic
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <Input
                            type="text"
                            name="topic"
                            id="topic"
                            placeholder=""
                            autoComplete={false}
                            valid={!errors.topic}
                            invalid={touched.topic && !!errors.topic}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.topic}
                          />
                          <FormFeedback>{errors.topic}</FormFeedback>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          {/* <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="documentCode" style={classes.label}>
                                Document Code
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="documentCode"
                                id="documentCode"
                                placeholder=""
                                // autoComplete={false}
                                // valid={!errors.documentCode}
                                // invalid={touched.documentCode && !!errors.documentCode}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.documentCode}
                              />
                               <FormFeedback>{errors.documentCode}</FormFeedback>
                            </div>
                          </div> */}

                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="expectedSaleTime"
                                style={classes.label}
                              >
                                Expected Sale Time
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
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
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="closedDate" style={classes.label}>
                                Closed Date
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="date"
                                name="closedDate"
                                id="closedDate"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.closedDate}
                                // invalid={touched.closedDate && !!errors.closedDate}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.closedDate}
                              />
                              {/* <FormFeedback>{errors.closedDate}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="leadId" style={classes.label}>
                                Lead
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="leadId"
                                id="leadId"
                                placeholder=""
                                // autoComplete={false}
                                // valid={!errors.leadId}
                                // invalid={touched.leadId && !!errors.leadId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.leadId}
                              >
                                <option selected></option>
                                {personfield.map(e => (
                                  <option value={e.contactPersonId}>
                                    {e.firstName}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.leadId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="type" style={classes.label}>
                                Type
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="type"
                                id="type"
                                placeholder=""
                                autoComplete={false}
                                valid={!errors.type}
                                invalid={touched.type && !!errors.type}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.type}
                              >
                                <option selected />
                                <option value={"New Business"}>
                                  {"New Business"}
                                </option>
                                <option value={"Existing Business"}>
                                  {"Existing Business"}
                                </option>
                              </Input>
                              <FormFeedback>{errors.type}</FormFeedback>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="currencyCode" style={classes.label}>
                                Currency
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="currencyCode"
                                id="currencyCode"
                                placeholder=""
                                autoComplete={false}
                                valid={!errors.currencyCode}
                                invalid={
                                  touched.currencyCode && !!errors.currencyCode
                                }
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.currencyCode}
                              >
                                <option selected></option>
                                {currency.map(e => (
                                  <option value={e.code}>{e.name}</option>
                                ))}
                              </Input>
                              <FormFeedback>{errors.currencyCode}</FormFeedback>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label
                                for="marketingCampaignId"
                                style={classes.label}
                              >
                                Marketing Campaign
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="marketingCampaignId"
                                id="marketingCampaignId"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.marketingCampaignId}
                                // invalid={touched.marketingCampaignId && !!errors.marketingCampaignId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.marketingCampaignId}
                              >
                                <option selected />
                                {mktCamp.map(e => (
                                  <option value={e.marketingCampaignId}>
                                    {e.name}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.type}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="salesOpportunityStageId"
                                style={classes.label}
                              >
                                Sales Opportunity Stage
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="salesOpportunityStageId"
                                id="salesOpportunityStageId"
                                placeholder=""
                                // autoComplete={false}
                                // valid={!errors.salesOpportunityStageId}
                                // invalid={touched.salesOpportunityStageId && !!errors.salesOpportunityStageId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.salesOpportunityStageId}
                              >
                                <option selected></option>
                                {salestage.map(e => (
                                  <option value={e.salesOpportunityStageId}>
                                    {e.name}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.leadId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label
                                for="salesOpportunityProbabilityId"
                                style={classes.label}
                              >
                                Sales Opp. Probability
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                              <Input
                                type="select"
                                name="salesOpportunityProbabilityId"
                                id="salesOpportunityProbabilityId"
                                placeholder=""
                                autoComplete={false}
                                // valid={!errors.salesOpportunityProbabilityId}
                                // invalid={touched.salesOpportunityProbabilityId && !!errors.salesOpportunityProbabilityId}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.salesOpportunityProbabilityId}
                              >
                                <option selected />
                                {salesprob.map(e => (
                                  <option
                                    value={e.salesOpportunityProbabilityId}
                                  >
                                    {e.name}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.salesOpportunityProbabilityId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="expectedRevenue"
                                style={classes.label}
                              >
                                Expected Revenue
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="number"
                                name="expectedRevenue"
                                id="expectedRevenue"
                                placeholder=""
                                // autoComplete={false}
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
                                valid={!errors.status}
                                invalid={touched.status && !!errors.status}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                              >
                                <option selected />
                                <option value={"Open"}>{"Open"}</option>
                                <option value={"Close"}>{"Close"}</option>
                                <option value={"In Progress"}>
                                  {"In Progress"}
                                </option>
                                <option value={"Completed Won"}>
                                  {"Completed Won"}
                                </option>
                                <option value={"Completed Lost"}>
                                  {"Completed Lost"}
                                </option>
                              </Input>
                              <FormFeedback>{errors.status}</FormFeedback>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="reference" style={classes.label}>
                                Reference
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="reference"
                                id="reference"
                                placeholder=""
                                // autoComplete={false}
                                // valid={!errors.reference}
                                // invalid={touched.reference && !!errors.reference}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.reference}
                              />
                              {/* <FormFeedback>{errors.reference}</FormFeedback> */}
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
                              {/* <FormFeedback>{errors.salesOpportunityProbabilityId}</FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                          <Label for="remarks " style={classes.label}>
                            Remarks
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <Input
                            type="textarea"
                            name="remarks"
                            id="remarks"
                            placeholder=""
                            autoComplete={false}
                            // valid={!errors.remarks}
                            // invalid={touched.remarks && !!errors.remarks}
                            // autoFocus={true}
                            // required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.remarks}
                          />
                          {/* <FormFeedback>{errors.remarks}</FormFeedback> */}
                        </div>
                      </div>
                      <br />
                      <AddStockItem addtomain={getitems} />
                      <br />
                    </Tab>
                    <Tab
                      eventKey="activity"
                      disabled={false}
                      title="Activity"
                      disabled={true}
                      // onSelect={event => changeColor(event)}
                    >
                      {/* <ListingNoteActivty
                        Showhead={false}
                        ShowFoot={true}
                        callid={true}
                        idofParent={props.IDforAPI}
                      /> */}
                    </Tab>
                    <Tab
                      eventKey="parentnotes"
                      disabled={false}
                      title="Notes"
                      disabled={true}
                      // onSelect={event => changeColor(event)}
                    >
                      {/* <ListingNotes
                        Showhead={false}
                        ShowFoot={true}
                        callid={true}
                        idofParent={props.IDforAPI}
                        noteType={"notes"}
                      /> */}
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

export default AddSales;
