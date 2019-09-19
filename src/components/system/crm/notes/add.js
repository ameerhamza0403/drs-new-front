import React, { Component, useState, useEffect } from "react";
import { PostFileUpload, PostCrmNotes } from "..//shared/notes";
import { GetCrmContacts } from "../shared/contacts";
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

let dialogevent = "";
let dialogueContent = "";
let AddNotes = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(files[0] === undefined)) {
      // files.map(async e => {
      let formdata = new FormData();
      formdata.append(files[0].name, files[0]);
      await PostFileUpload(formdata);
      // });
      values.imagePath = files[0].name;
      await PostCrmNotes(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    } else {
      await PostCrmNotes(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    }
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      // name: Yup.string().required("Name is required"),
      contactId: Yup.string().required("Contact is required")
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
  let [dialogval, setDialogval] = useState([]);
  let [showdia, setShowdia] = useState(true);

  let [Parentcontact, setParentContact] = useState([]);

  async function getlistapi() {
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

  const initialValues = {
    name: "",
    isActive: true,
    receiveDocs: false,
    receiveEmails: false,
    anonymised: false
  };

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

  if (showdia) {
    dialogueContent = (
      <div className="row">
        <div
          className="col-12"
          style={{
            height: "250px",
            padding: "5px",
            paddingTop: "0px"
          }}
        >
          <div
            style={{
              border: "1px solid #C8CED3",
              width: "90%",
              height: "100%",
              margin: "3%",
              overflowX: "hidden",
              scrollBehavior: "auto",
              marginTop: "0%"
            }}
          >
            {dialogval.map(e => (
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  width: "90%",
                  height: "50px",
                  margin: '1%',
                  padding: '5px',
                }}
              >
                <p
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: "bold"
                  }}
                >
                  {e.time}
                </p>
                <p
                  style={{
                    fontSize: "0.9rem"
                  }}
                >
                  {e.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="col-12"
          style={{
            height: "60px",
            padding: "5px",
            paddingTop: "0px"
          }}
        >
          <div
            style={{
              // border: "1px solid #EE7647",
              width: "90%",
              height: "100%",
              margin: "3%",
              marginTop: "0%"

              // overflowX: "hidden",
              // scrollBehavior: "auto"
            }}
          >
            <div className="row">
              <div className="col-10">
                <Input
                  type="textarea"
                  name="landline"
                  id="landline"
                  placeholder=""
                  autoComplete={false}
                  // valid={!errors.landline}
                  // invalid={touched.landline && !!errors.landline}
                  // autoFocus={true}
                  // required
                  onChange={e => {
                    dialogevent = e.target.value;
                  }}
                  // value={dialogevent}
                  style={{
                    height: "100%",
                    resize: "none"
                  }}
                />
              </div>
              <div className="col-1">
                <i
                  className="fa fa-plus fa-2x"
                  style={{
                    cursor: "pointer",
                    color: "#EE7647"
                  }}
                  onClick={() => {
                    setShowdia(false);
                    let date = new Date();
                    if (!(dialogevent === "")) {
                      let obj = {};
                      if (dialogval === []) {
                        obj["value"] = dialogevent;
                        obj["label"] = dialogevent;
                        obj[
                          "time"
                        ] = `${date
                          .getDate()
                          .toString()}-${(date.getMonth()+1).toString()}-
                            ${date.getFullYear().toString()}-
                              ${date.getHours().toString()}:
                              ${date.getMinutes().toString()}:
                                ${date.getSeconds().toString()}:
                                ${date.getMilliseconds().toString()}`;
                        dialogval[0] = obj;
                      } else {
                        obj["value"] = dialogevent;
                        obj["label"] = dialogevent;
                        obj[
                          "time"
                        ] = `${date
                          .getDate()
                          .toString()}-${(date.getMonth()+1).toString()}-
                            ${date.getFullYear().toString()}-
                              ${date.getHours().toString()}:
                              ${date.getMinutes().toString()}:
                                ${date.getSeconds().toString()}:
                                ${date.getMilliseconds().toString()}`;
                        dialogval.push(obj);
                      }
                    }
                    dialogevent = "";
                    setTimeout(() => {
                      setShowdia(true);
                    }, 10);
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    dialogueContent = "";
  }
  return (
    <div>
      <Card>
        <CardBody>
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
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label
                                        for="contactId"
                                        style={classes.label}
                                      >
                                        Contact
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="select"
                                        name="contactId"
                                        id="contactId"
                                        placeholder=""
                                        autoComplete={false}
                                        valid={!errors.contactId}
                                        invalid={
                                          touched.contactId &&
                                          !!errors.contactId
                                        }
                                        autoFocus={true}
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.contactId}
                                      >
                                        <option selected></option>
                                        {Parentcontact.map(e => (
                                          <option value={e.contactId}>
                                            {e.name}
                                          </option>
                                        ))}
                                      </Input>
                                      <FormFeedback>
                                        {errors.parentContactId}
                                      </FormFeedback>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Reference
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Type
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Parent Note
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Workflow
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Status
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Subject
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Notes
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="textarea"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                      <Label for="email" style={classes.label}>
                                        Notes Owner
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                                      <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.email}
                                        // invalid={
                                        //   touched.email &&
                                        //   !!errors.email
                                        // }
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <FormFeedback>
                                        {errors.email}
                                      </FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-1">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                      <Label
                                        for="mobilePhone"
                                        style={classes.label}
                                      >
                                        Due Date
                                      </Label>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="date"
                                        name="mobilePhone"
                                        id="mobilePhone"
                                        // placeholder=""
                                        // autoComplete={false}
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
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                      <Input
                                        type="time"
                                        name="landline"
                                        id="landline"
                                        placeholder=""
                                        autoComplete={false}
                                        // valid={!errors.landline}
                                        // invalid={touched.landline && !!errors.landline}
                                        // autoFocus={true}
                                        // required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.landline}
                                      />
                                      {/* <FormFeedback>{errors.landline}</FormFeedback> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ************************************** */}
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <Label for="Dialogue" style={classes.label}>
                                Dialogue
                              </Label>
                              {dialogueContent}
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
                              filesLimit={1}
                            />
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNotes;
