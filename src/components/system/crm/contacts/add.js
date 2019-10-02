import React, { Component, useState, useEffect } from "react";
import {
  PostFileUpload,
  PostCrmContacts,
  GetCrmContacts
} from "..//shared/contacts";
import { GetCrmContactGroup } from "../shared/contactgroup";
import ListingContactPerson from "../contactperson/listing";
import ListingNotes from "../notes/listing";
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
import { DropzoneArea } from "material-ui-dropzone";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import "../../../../scss/override/select.scss";
import { Divider } from "@material-ui/core";
import GoogleMapForCrm from "./map/mapview/main";

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
    // color: "#999"
  }
};

let formikdata = "";
let AddCrmContacts = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (values.isFlagged === "true") {
      values.isFlagged = true;
    } else {
      values.isFlagged = false;
    }
    values.groupId = parseInt(values.groupId);
    if (!(files === [])) {
      files.map(async e => {
        let formdata = new FormData();
        formdata.append(e.name, e);
        await PostFileUpload(formdata);
      });

      await PostCrmContacts(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    } else {
      await PostCrmContacts(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    }
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      groupId: Yup.string().required("Group is required")
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
    getlistapi();
  }, []);

  let [files, setFiles] = useState([]);

  let [Contactgroup, setContactGroup] = useState([]);
  let [Parentcontact, setParentContact] = useState([]);

  async function getlistapi() {
    const { data: Contactgroup } = await GetCrmContactGroup(0, 0);
    setContactGroup(Contactgroup);

    const { data: Parentcontact } = await GetCrmContacts(0, 0);
    setParentContact(Parentcontact);

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

  let [initialValues, setinitialValues] = useState({
    name: "",
    isActive: true
  });

  function handleChangefile(files) {
    setFiles((files = files));
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

  function updateadd(data) {
    // setFormshow(false);
    setinitialValues({
      ...initialValues,
      ["contactAddress"]: data.address,
      ["name"]: data.name,
      ["country"]: data.country,
      ["city"]: data.city,
      ["lat"]: data.lat,
      ["lng"]: data.lng,
      ["radius"]: data.radius
    });
    // setFormshow(true);
    console.log(initialValues);
  }

  return (
    <div>
      <Card>
        <CardBody>
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
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="name" style={classes.label}>
                                        Contact Name
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
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
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="groupId"
                                        style={classes.label}
                                      >
                                        Group
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="select"
                                        name="groupId"
                                        id="groupId"
                                        placeholder=""
                                        autoComplete={false}
                                        valid={!errors.groupId}
                                        invalid={
                                          touched.groupId && !!errors.groupId
                                        }
                                        autoFocus={true}
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.groupId}
                                      >
                                        <option selected></option>
                                        {Contactgroup.map(e => (
                                          <option value={e.contactGroupId}>
                                            {e.name}
                                          </option>
                                        ))}
                                      </Input>
                                      <FormFeedback>
                                        {errors.groupId}
                                      </FormFeedback>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="parentAssetId"
                                        style={classes.label}
                                      >
                                        Reference
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="text"
                                        name="reference"
                                        id="reference"
                                        // placeholder=""
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
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label
                                        for="parentContactId"
                                        style={classes.label}
                                      >
                                        Parent Contact
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="select"
                                        name="parentContactId"
                                        id="parentContactId"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.parentContactId}
                                        // invalid={
                                        //   touched.parentContactId &&
                                        //   !!errors.parentContactId
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.parentContactId}
                                      >
                                        <option selected></option>
                                        {Parentcontact.map(e => (
                                          <option value={e.contactId}>
                                            {e.name}
                                          </option>
                                        ))}
                                      </Input>
                                      {/* <FormFeedback>
                                        {errors.parentContactId}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label
                                        for="contactAddress"
                                        style={classes.label}
                                      >
                                        Contact Address
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="contactAddress"
                                        id="contactAddress"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.contactAddress}
                                        // invalid={
                                        //   touched.contactAddress &&
                                        //   !!errors.contactAddress
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.contactAddress}
                                      />
                                      {/* <FormFeedback>
                                        {errors.contactAddress}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label for="city" style={classes.label}>
                                        City
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        // placeholder=""
                                        // autoComplete={false}
                                        // valid={!errors.city}
                                        // invalid={touched.city && !!errors.city}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                      />
                                      {/* <FormFeedback>{errors.city}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="postcode"
                                        style={classes.label}
                                      >
                                        PostCode
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="text"
                                        name="postcode"
                                        id="postcode"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.postcode}
                                        // invalid={touched.postcode && !!errors.postcode}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.postcode}
                                      />
                                      {/* <FormFeedback>{errors.postcode}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="country"
                                        style={classes.label}
                                      >
                                        Country
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.country}
                                        // invalid={touched.country && !!errors.country}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                      />
                                      {/* <FormFeedback>{errors.country}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                      <Label for="radius" style={classes.label}>
                                        Radius
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                      <Input
                                        type="text"
                                        name="radius"
                                        id="radius"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.radius}
                                        // invalid={touched.radius && !!errors.radius}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.radius}
                                      />
                                      {/* <FormFeedback>{errors.radius}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="expiryDate"
                                        style={classes.label}
                                      >
                                        Expiry Date
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="date"
                                        name="expiryDate"
                                        id="expiryDate"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.expiryDate}
                                        // invalid={touched.expiryDate && !!errors.expiryDate}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.expiryDate}
                                      />
                                      {/* <FormFeedback>{errors.expiryDate}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                      <Label
                                        for="isFlagged"
                                        style={classes.label}
                                      >
                                        Flagged
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                      <FormGroup check className="radio inline">
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          id="isFlagged"
                                          name="isFlagged"
                                          value={true}
                                          onClick={handleChange}
                                        />
                                        <Label
                                          check
                                          className="form-check-label"
                                          htmlFor="Yes"
                                        >
                                          Yes
                                        </Label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          id="isFlagged"
                                          name="isFlagged"
                                          value={false}
                                          onClick={handleChange}
                                        />
                                        <Label
                                          check
                                          className="form-check-label"
                                          htmlFor="No"
                                        >
                                          No
                                        </Label>
                                      </FormGroup>
                                      {/* <FormFeedback>{errors.isFlagged}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label
                                        for="flaggedReason"
                                        style={classes.label}
                                      >
                                        Flagged Reason
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="textarea"
                                        name="flaggedReason"
                                        id="flaggedReason"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.flaggedReason}
                                        // invalid={touched.flaggedReason && !!errors.flaggedReason}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.flaggedReason}
                                      />
                                      {/* <FormFeedback>{errors.flaggedReason}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label
                                        for="extraInfo"
                                        style={classes.label}
                                      >
                                        Extra Info
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="textarea"
                                        name="extraInfo"
                                        id="extraInfo"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.extraInfo}
                                        // invalid={touched.extraInfo && !!errors.extraInfo}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.extraInfo}
                                      />
                                      {/* <FormFeedback>{errors.extraInfo}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                              {/* <Divider />
                              <p style={{ textAlign: "center" }}>
                                Primary Person
                              </p> */}

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="phone" style={classes.label}>
                                        Mobile Phone
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.phone}
                                        // invalid={touched.phone && !!errors.phone}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                      />
                                      {/* <FormFeedback>{errors.phone}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Email
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="email"
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
                                      <Label
                                        for="birthday"
                                        style={classes.label}
                                      >
                                        Birthdate
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="date"
                                        name="birthday"
                                        id="birthday"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.birthday}
                                        // invalid={touched.birthday && !!errors.birthday}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.birthday}
                                      />
                                      {/* <FormFeedback>{errors.birthday}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                      <Label
                                        for="website"
                                        style={classes.label}
                                      >
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

                              {/* ************************************************ */}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              {/* <div  className='container'> */}
                              <GoogleMapForCrm updateadd={updateadd} />
                              {/* </div> */}
                            </div>
                          </div>
                        </Tab>

                        <Tab
                          eventKey="attachment"
                          disabled={false}
                          title="Attachments"
                          // onSelect={event => changeColor(event)}
                        >
                          <div className="container">
                            <DropzoneArea
                              onChange={handleChangefile}
                              acceptedFiles={[
                                "image/jpeg",
                                "image/png",
                                "image/bmp",
                                "application/pdf"
                              ]}
                              showPreviews={false}
                              maxFileSize={5000000}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="person"
                          title="Person"
                          disabled

                          // onSelect={event => changeColor(event)}
                        >
                          <ListingContactPerson
                            Showhead={false}
                            ShowFoot={true}
                            callid={true}
                            idofcontact={props.IDforAPI}
                          />
                        </Tab>
                        <Tab
                          eventKey="notes"
                          title="Notes"
                          disabled

                          // onSelect={event => changeColor(event)}
                        >
                          <ListingNotes
                            Showhead={false}
                            ShowFoot={true}
                            callid={true}
                            idofParent={props.IDforAPI}
                          />
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCrmContacts;
