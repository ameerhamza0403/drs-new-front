import React, { Component, useState, useEffect } from "react";
import {
  PutCrmMarkMemberList,
  GetCrmMarkMemberListById
} from "..//shared/markmemberlist";
import Select from "react-select";
import { GetCrmMarketingList } from "../shared/marketinglist";
import { GetCrmContactPerson } from "../shared/contactperson";
import { GetCrmLead } from "../shared/lead";
import "../../../../scss/customstyles/tabs.css";
import MultiSelect from "@khanacademy/react-multi-select";
import "./select.css";
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

let options = [];
let optionscont = [];
let EditCrmMember = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  let [leadval, setleadval] = useState([]);
  let [contactval, setcontactval] = useState([]);

  async function onSubmit(values, { setSubmitting, setErrors }) {

    console.log(values);
    await PutCrmMarkMemberList(props.IDforAPI, values)
      .then(res => props.success())
      .catch(error => props.error());
    props.backmain(1);
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      marketingListId: Yup.string().required("List is required"),
      // group: Yup.string().required("group is required"),
      additionalInfo: Yup.string().required("Info is Required"),
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
  let [initialValues, setInitialValues] = useState({
    isActive: true
  });

  useEffect(() => {
    settabledistatus(false);
    getlistapi();
  }, []);

  let [marklist, setMarklist] = useState([]);
  let [contact, setContact] = useState([]);
  let [lead, setLead] = useState([]);

  async function getlistapi() {
    const { data: initialValues } = await GetCrmMarkMemberListById(
      props.IDforAPI
    );
    setInitialValues(initialValues);

    const { data: marklist } = await GetCrmMarketingList(0, 0);
    setMarklist(marklist);

    // const { data: lead } = await GetCrmLead(0, 0);
    // setLead(lead);

    // const { data: contact } = await GetCrmContactPerson(0, 0);
    // setContact(marklist);

    // lead.map((e, i) => {
    //   var obj = {};
    //   obj["label"] = e.name;
    //   var valbody = {};
    //   valbody["value"] = e.leadId;
    //   valbody["name"] = e.name;
    //   valbody["businessPhone"] = e.businessPhone;
    //   // valbody["email"] = e.email;
    //   obj["value"] = valbody;
    //   if (i === 0) {
    //     options[0] = obj;
    //   } else {
    //     options.push(obj);
    //   }
    // });

    // contact.map((e, i) => {
    //   var obj = {};
    //   obj["label"] = e.firstName;
    //   var valbody = {};
    //   valbody["value"] = e.contactPersonId;
    //   valbody["name"] = e.firstName;
    //   valbody["businessPhone"] = e.mobilePhone;
    //   valbody["email"] = e.email;
    //   obj["value"] = valbody;
    //   if (i === 0) {
    //     optionscont[0] = obj;
    //   } else {
    //     optionscont.push(obj);
    //   }
    // });

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
                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label for="fullName" style={classes.label}>
                                    Fullname
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    // placeholder=""
                                    // autoComplete={false}
                                    // valid={!errors.fullName}
                                    // invalid={
                                    //   touched.fullName &&
                                    //   !!errors.fullName
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                          </div>
                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="businessPhone"
                                    style={classes.label}
                                  >
                                    Business Phone
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="businessPhone"
                                    id="businessPhone"
                                    // placeholder=""
                                    // autoComplete={false}
                                    // valid={!errors.businessPhone}
                                    // invalid={
                                    //   touched.businessPhone &&
                                    //   !!errors.businessPhone
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.businessPhone}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                          </div>
                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="marketingListId"
                                    style={classes.label}
                                  >
                                    Marketing List
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="select"
                                    name="marketingListId"
                                    id="marketingListId"
                                    // placeholder=""
                                    // autoComplete={false}
                                    valid={!errors.marketingListId}
                                    invalid={
                                      touched.marketingListId &&
                                      !!errors.marketingListId
                                    }
                                    autoFocus={true}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.marketingListId}
                                  >
                                    <option selected />
                                    {marklist.map(e => (
                                      <option value={e.marketingListId}>
                                        {e.name}
                                      </option>
                                    ))}
                                  </Input>
                                  <FormFeedback>
                                    {errors.marketingListId}
                                  </FormFeedback>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                          </div>

                          <div
                            className="row mb-1"
                            hidden={
                              values.contactPersonId === null ? true : false
                            }
                          >
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="contactPersonId"
                                    style={classes.label}
                                  >
                                    Contact
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  {/* <MultiSelect
                                    options={optionscont}
                                    selected={contactval}
                                    onSelectedChanged={e => {
                                      setcontactval((contactval = e));
                                    }}
                                    overrideStrings={{
                                      selectSomeItems: "Select Contact...",
                                      allItemsAreSelected:
                                        "All Items are Selected",
                                      selectAll: "Select All",
                                      search: "Search"
                                    }}
                                  /> */}
                                  <Input
                                    type="select"
                                    name="contactPersonId"
                                    id="contactPersonId"
                                    // placeholder=""
                                    // autoComplete={false}
                                    // valid={!errors.contactPersonId}
                                    // invalid={
                                    //   touched.contactPersonId &&
                                    //   !!errors.contactPersonId
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contactPersonId}
                                  >
                                    <option selected disabled >{values.contactPersonName}</option>
                                    {/* {marklist.map(e => (
                                      <option value={e.marketingListId}>
                                        {e.name}
                                      </option>
                                    ))} */}
                                  </Input>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                          </div>

                          <div
                            className="row mb-1"
                            hidden={values.leadId === null ? true : false}
                          >
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="leadId"
                                    style={classes.label}
                                  >
                                    Lead
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  {/* <MultiSelect
                                    options={options}
                                    selected={leadval}
                                    onSelectedChanged={e => {
                                      setleadval((leadval = e));
                                    }}
                                    overrideStrings={{
                                      selectSomeItems: "Select List...",
                                      allItemsAreSelected:
                                        "All Items are Selected",
                                      selectAll: "Select All",
                                      search: "Search"
                                    }}
                                  /> */}
                                  <Input
                                    type="select"
                                    name="LeadId"
                                    id="LeadId"

                                    // placeholder=""
                                    // autoComplete={false}
                                    // valid={!errors.LeadId}
                                    // invalid={
                                    //   touched.LeadId &&
                                    //   !!errors.LeadId
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.LeadId}
                                  >
                                    <option selected disabled >{values.leadName}</option>
                                    {/* {marklist.map(e => (
                                      <option value={e.marketingListId}>
                                        {e.name}
                                      </option>
                                    ))} */}
                                  </Input>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                          </div>

                          <div className="row mb-1">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                  <Label
                                    for="additionalInfo"
                                    style={classes.label}
                                  >
                                    Additional Info
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="textarea"
                                    name="additionalInfo"
                                    id="additionalInfo"
                                    // placeholder=""
                                    autoComplete={false}
                                    valid={!errors.additionalInfo}
                                    invalid={
                                      touched.additionalInfo &&
                                      !!errors.additionalInfo
                                    }
                                    autoFocus={true}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.additionalInfo}
                                  />
                                  <FormFeedback>
                                    {errors.additionalInfo}
                                  </FormFeedback>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
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

export default EditCrmMember;
