import React, { Component, useState, useEffect } from "react";
import { GetCrmNotesById, PutCrmNotes, PostFileUpload } from "..//shared/notes";
import ListingNotes from "./listing";
import ListingNoteActivty from "../noteactivity/listing";
import { GetCrmContacts } from "../shared/contacts";
import "../../../../scss/customstyles/tabs.css";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
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
import { GetCrmNotes } from "../shared/notes";
import { GetCrmContactPerson } from "../shared/contactperson";
import { GetListingForNote } from "../../../myaccount/admin/contactnote/shared/notetype";
import { Spinner } from "reactstrap";

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

let EditNotes = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    values.dueDate = `${values.dueDate}T${values.dueDatemodified}`;
    delete values.dueDatemodified;
    values.completionDatemodified = `${values.completionDate}T${values.completionDatemodified}`;
    delete values.completionDatemodified;
    await PutCrmNotes(props.IDforAPI, values)
      .then(res => props.success())
      .catch(error => props.error());
    setSubmitting(false);
    props.backmain(1);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      // name: Yup.string().required("Name is required"),
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
  let [Tabledistatus, settabledistatus] = useState(false);
  let [Parentcontact, setParentContact] = useState([]);
  let [stockitem, setstockitem] = useState([]);
  let [notetype, setnotetype] = useState([]);
  let [vehicle, setvehicle] = useState([]);
  let [resource, setresource] = useState([]);
  let [asset, setasset] = useState([]);
  let [note, setnote] = useState([]);
  let [person, setperson] = useState([]);
  let [initialValues, setInitialValues] = useState({
    name: "",
    // imagePath: "",
    // order: 0,
    isActive: true
  });

  useEffect(() => {
    settabledistatus(false);
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetCrmNotesById(props.IDforAPI);
    setInitialValues(initialValues);

    const { data: notetype } = await GetListingForNote();
    setnotetype(notetype);

    if (props.noteType === "item") {
      const { data: stockitem } = await GetCrmContacts(0, 0);
      setstockitem(stockitem);
    } else if (props.noteType === "person") {
      const { data: person } = await GetCrmContactPerson(0, 0);
      setperson(person);
    } else if (props.noteType === "contact") {
      const { data: Parentcontact } = await GetCrmContacts(0, 0);
      setParentContact(Parentcontact);
    } else if (props.noteType === "vehicle") {
      const { data: vehicle } = await GetCrmContacts(0, 0);
      setvehicle(vehicle);
    } else if (props.noteType === "resource") {
      const { data: resource } = await GetCrmContacts(0, 0);
      setresource(resource);
    } else if (props.noteType === "customerasset") {
      const { data: asset } = await GetCrmContacts(0, 0);
      setasset(asset);
    } else if (props.noteType === "notes") {
      const { data: note } = await GetCrmNotes(0, 0);
      setnote(note);
    }

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

    initialValues.status = initialValues.status.trim();

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

    // if (!(initialValues.birthday === null)) {
    //   initialValues.birthday = initialValues.birthday.substr(
    //     0,
    //     initialValues.birthday.length - 9
    //   );
    // }
    // if (!(initialValues.expiryDate === null)) {
    //   initialValues.expiryDate = initialValues.expiryDate.substr(
    //     0,
    //     initialValues.expiryDate.length - 9
    //   );
    // }

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
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
        <Card>
          <CardBody>
            <Tabs
              defaultActiveKey="general"
              transition={false}
              id="noanim-tab-example"
              className={classes.myclass}
            >
              <Tab
                eventKey="general"
                disabled={false}
                title="Notes"
                // onSelect={event => changeColor(event)}
              >
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
                        <Form
                          onSubmit={handleSubmit}
                          noValidate
                          name="simpleForm"
                        >
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
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "contact"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="contactId"
                                          style={classes.label}
                                        >
                                          Contact
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="contactId"
                                          id="contactId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.contactId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {Parentcontact.map(e => (
                                            <option value={e.contactId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "item" ? false : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="itemId"
                                          style={classes.label}
                                        >
                                          Stock Item
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="itemId"
                                          id="itemId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.itemId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {stockitem.map(e => (
                                            <option value={e.itemId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "customerasset"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="contactId"
                                          style={classes.label}
                                        >
                                          Customer Asset
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="customerAssetId"
                                          id="customerAssetId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.customerAssetId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {asset.map(e => (
                                            <option value={e.customerAssetId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "resource"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="resourceId"
                                          style={classes.label}
                                        >
                                          Resource
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="resourceId"
                                          id="resourceId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.resourceId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {resource.map(e => (
                                            <option value={e.resourceId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "vehicle"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="vehicleId"
                                          style={classes.label}
                                        >
                                          Vehicle
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="vehicleId"
                                          id="vehicleId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.vehicleId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {vehicle.map(e => (
                                            <option value={e.vehicleId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "notes"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="parentNoteId"
                                          style={classes.label}
                                        >
                                          Note
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="parentNoteId"
                                          id="parentNoteId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.parentNoteId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {note.map(e => (
                                            <option value={e.parentNoteId}>
                                              {e.notes}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div
                                      className="row mb-1"
                                      hidden={
                                        props.noteType === "person"
                                          ? false
                                          : true
                                      }
                                    >
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="contactPersonId"
                                          style={classes.label}
                                        >
                                          Contact Person
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="contactPersonId"
                                          id="contactPersonId"
                                          placeholder=""
                                          autoComplete={false}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.contactPersonId}
                                          disabled={true}
                                        >
                                          <option selected></option>
                                          {person.map(e => (
                                            <option value={e.contactPersonId}>
                                              {e.firstName}
                                            </option>
                                          ))}
                                        </Input>
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="reference"
                                          style={classes.label}
                                        >
                                          Reference
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="text"
                                          name="reference"
                                          id="reference"
                                          placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.reference}
                                          // invalid={
                                          //   touched.reference &&
                                          //   !!errors.reference
                                          // }
                                          // autoFocus={true}
                                          // required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.reference}
                                        />
                                        {/* <FormFeedback>
                                        {errors.reference}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="noteTypeId"
                                          style={classes.label}
                                        >
                                          Type
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="select"
                                          name="noteTypeId"
                                          id="noteTypeId"
                                          placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.noteTypeId}
                                          // invalid={
                                          //   touched.noteTypeId &&
                                          //   !!errors.noteTypeId
                                          // }
                                          // autoFocus={true}
                                          // required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.noteTypeId}
                                        >
                                          <option selected></option>
                                          {notetype.map(e => (
                                            <option value={e.noteTypeId}>
                                              {e.name}
                                            </option>
                                          ))}
                                        </Input>
                                        {/* <FormFeedback>
                                        {errors.noteTypeId}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="status"
                                          style={classes.label}
                                        >
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
                                          <option value="Open">{"Open"}</option>
                                          <option value="Completed">
                                            {"Completed"}
                                          </option>
                                          <option value="Cancelled">
                                            {"Cancelled"}
                                          </option>
                                        </Input>
                                        {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="notes"
                                          style={classes.label}
                                        >
                                          Notes
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="textarea"
                                          name="notes"
                                          id="notes"
                                          placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.notes}
                                          // invalid={
                                          //   touched.notes &&
                                          //   !!errors.notes
                                          // }
                                          // autoFocus={true}
                                          // required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.notes}
                                        />
                                        {/* <FormFeedback>
                                        {errors.notes}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="noteOwner"
                                          style={classes.label}
                                        >
                                          Notes Owner
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <Input
                                          type="text"
                                          name="noteOwner"
                                          id="noteOwner"
                                          placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.noteOwner}
                                          // invalid={
                                          //   touched.noteOwner &&
                                          //   !!errors.noteOwner
                                          // }
                                          // autoFocus={true}
                                          // required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.noteOwner}
                                        />
                                        {/* <FormFeedback>
                                        {errors.noteOwner}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="subject"
                                          style={classes.label}
                                        >
                                          Subject
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
                                        {/* <FormFeedback>
                                        {errors.subject}
                                      </FormFeedback> */}
                                      </div>
                                    </div>

                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="dueDate"
                                          style={classes.label}
                                        >
                                          Due Date
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <Input
                                          type="date"
                                          name="dueDate"
                                          id="dueDate"
                                          // placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.dueDate}
                                          // invalid={
                                          //   touched.dueDate && !!errors.dueDate
                                          // }
                                          // autoFocus={true}
                                          // required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.dueDate}
                                        />
                                        {/* <FormFeedback>{errors.dueDate}</FormFeedback> */}
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
                                          defaultValue={values.dueDatemodified}
                                          onChange={e => {
                                            values.dueDatemodified =
                                              e.target.value;
                                          }}
                                          onBlur={handleBlur}
                                          // value={values.dueDate}
                                        />
                                        {/* <FormFeedback>{errors.dueDate}</FormFeedback> */}
                                      </div>
                                    </div>
                                    <div className="row mb-1">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <Label
                                          for="completionDate"
                                          style={classes.label}
                                        >
                                          Completion Date
                                        </Label>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <Input
                                          type="date"
                                          name="completionDate"
                                          id="completionDate"
                                          // placeholder=""
                                          autoComplete={false}
                                          // valid={!errors.completionDate}
                                          // invalid={
                                          //   touched.completionDate && !!errors.completionDate
                                          // }
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
                                          // valid={!errors.dueDate}
                                          // invalid={touched.dueDate && !!errors.dueDate}
                                          // autoFocus={true}
                                          // required
                                          defaultValue={
                                            values.completionDatemodified
                                          }
                                          onChange={e => {
                                            values.completionDatemodified =
                                              e.target.value;
                                          }}
                                          onBlur={handleBlur}
                                          // value={values.completionDatemodified}
                                        />
                                        {/* <FormFeedback>{errors.completionDatemodified}</FormFeedback> */}
                                      </div>
                                    </div>
                                  </div>

                                  {/* ************************************** */}
                                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
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
              </Tab>
              <Tab
                eventKey="activity"
                disabled={false}
                title="Activity"
                // onSelect={event => changeColor(event)}
              >
                <ListingNoteActivty
                  Showhead={false}
                  ShowFoot={true}
                  callid={true}
                  idofParent={props.IDforAPI}
                  ActivityType={"notes"}
                />
              </Tab>
              <Tab
                eventKey="parentnotes"
                disabled={false}
                title="Notes"
                // onSelect={event => changeColor(event)}
              >
                <ListingNotes
                  Showhead={false}
                  ShowFoot={true}
                  callid={true}
                  idofParent={props.IDforAPI}
                  noteType={"notes"}
                />
              </Tab>
            </Tabs>
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
