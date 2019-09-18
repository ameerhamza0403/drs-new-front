import React, { Component, useState, useEffect } from "react";
import {
  GetCrmContactPersonById,
  PutCrmContactPerson,
  PostFileUpload
} from "..//shared/contactperson";
import { GetCrmContacts } from "../shared/contacts";
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
import { DropzoneArea } from "material-ui-dropzone";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import "../../../../scss/override/select.scss";
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

let EditCrmContactPerson = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  let [files, setFiles] = useState([]);

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(files[0] === undefined)) {
      // files.map(async e => {
      let formdata = new FormData();
      formdata.append(files[0].name, files[0]);
      await PostFileUpload(formdata);
      // });
      values.imagePath = files[0].name;
      await PutCrmContactPerson(props.IDforAPI, values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    } else {
      await PutCrmContactPerson(props.IDforAPI, values)
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
  let [Tabledistatus, settabledistatus] = useState(false);
  let [Parentcontact, setParentContact] = useState([]);
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
    const { data: initialValues } = await GetCrmContactPersonById(
      props.IDforAPI
    );
    setInitialValues(initialValues);

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

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );
  if (Tabledistatus) {
    Tabledisplay = (
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
                          <div className="row mb-1">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                  <Label for="title" style={classes.label}>
                                    Title
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-1 col-xl-1">
                                  <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.title}
                                    // invalid={touched.title && !!errors.title}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                  />
                                  {/* <FormFeedback>{errors.title}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label for="firstName" style={classes.label}>
                                    First Name
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.firstName}
                                    // invalid={touched.firstName && !!errors.firstName}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                  />
                                  {/* <FormFeedback>{errors.firstName}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="lastName" style={classes.label}>
                                    Last Name
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                  <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.lastName}
                                    // invalid={touched.lastName && !!errors.lastName}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                  />
                                  {/* <FormFeedback>{errors.lastName}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-1">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                                  <Label for="contactId" style={classes.label}>
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
                                      touched.contactId && !!errors.contactId
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
                                    Email
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
                                    Mobile Phone
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
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
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label for="landline" style={classes.label}>
                                    Landline
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
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

                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label for="extentsion" style={classes.label}>
                                    Extentsion
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="extentsion"
                                    id="extentsion"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.extentsion}
                                    // invalid={touched.extentsion && !!errors.extentsion}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.extentsion}
                                  />
                                  {/* <FormFeedback>{errors.extentsion}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="department" style={classes.label}>
                                    Department
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                  <Input
                                    type="text"
                                    name="department"
                                    id="department"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.department}
                                    // invalid={touched.department && !!errors.department}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.department}
                                  />
                                  {/* <FormFeedback>{errors.department}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label for="position" style={classes.label}>
                                    Position
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="position"
                                    id="position"
                                    placeholder=""
                                    autoComplete={false}
                                    // valid={!errors.position}
                                    // invalid={touched.position && !!errors.position}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.position}
                                  />
                                  {/* <FormFeedback>{errors.position}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label
                                    for="receiveEmails"
                                    style={classes.label}
                                  >
                                    Receive Emails
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                  <FormGroup check className="radio inline">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      id="receiveEmails"
                                      name="receiveEmails"
                                      value={true}
                                      onClick={e =>
                                        (values.receiveEmails = true)
                                      }
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
                                      id="receiveEmails"
                                      name="receiveEmails"
                                      value={false}
                                      onClick={e =>
                                        (values.receiveEmails = false)
                                      }
                                      defaultChecked
                                    />
                                    <Label
                                      check
                                      className="form-check-label"
                                      htmlFor="No"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                  {/* <FormFeedback>{errors.receiveEmails}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="receiveDocs"
                                    style={classes.label}
                                  >
                                    Receive Docs
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <FormGroup check className="radio inline">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      id="receiveDocs"
                                      name="receiveDocs"
                                      value={true}
                                      onClick={e => (values.receiveDocs = true)}
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
                                      id="receiveDocs"
                                      name="receiveDocs"
                                      value={false}
                                      onClick={e =>
                                        (values.receiveDocs = false)
                                      }
                                      defaultChecked
                                    />
                                    <Label
                                      check
                                      className="form-check-label"
                                      htmlFor="No"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="anonymised" style={classes.label}>
                                    Anonymise
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                  <FormGroup check className="radio inline">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      id="anonymised"
                                      name="anonymised"
                                      value={true}
                                      onClick={e => (values.anonymised = true)}
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
                                      id="anonymised"
                                      name="anonymised"
                                      value={false}
                                      onClick={() =>
                                        (values.anonymised = false)
                                      }
                                      defaultChecked
                                    />
                                    <Label
                                      check
                                      className="form-check-label"
                                      htmlFor="No"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                  {/* <FormFeedback>{errors.receiveEmails}</FormFeedback> */}
                                </div>
                              </div>
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

export default EditCrmContactPerson;
