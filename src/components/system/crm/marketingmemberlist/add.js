import React, { Component, useState, useEffect } from "react";
import { PostCrmMarkMemberList } from "..//shared/markmemberlist";
import { GetCrmMarketingList } from "../shared/marketinglist";
import { GetCrmContactPerson } from "../shared/contactperson";
import { GetCrmLead } from "../shared/lead";
import MultiSelect from "@khanacademy/react-multi-select";
import "./select.css";
import { toast } from "react-toastify";
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

let options = [];
let optionscont = [];

let AddCrmMember = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  let [leadval, setleadval] = useState([]);
  let [contactval, setcontactval] = useState([]);

  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(leadval);
    console.log(contactval);
    if (values.group === "contact") {
      if (contactval[0] === undefined) {
        errort("Please select contact ...");
        setSubmitting(false);
      } else {
        delete values.group;
        delete values.leadId;
        contactval.map(async (e, i) => {
          let data = {
            contactPersonId: e.value,
            fullName: e.name,
            businessPhone: e.businessPhone,
            // additionalInfo: values.additionalInfo,
            marketingListId: values.marketingListId,
            isActive: values.isActive
          };
          await PostCrmMarkMemberList(data)
            .then(res => {
              if (i === contactval.length - 1) {
                props.success();
              }
            })
            .catch(error => props.error());
        });
        props.backmain(1);
        setSubmitting(false);
      }
    } else {
      if (leadval[0] === undefined) {
        errort("Please select Lead ...");
        setSubmitting(false);
      } else {
        delete values.leadId;
        delete values.group;
        leadval.map(async (e, i) => {
          let data = {
            leadId: e.value,
            fullName: e.name,
            businessPhone: e.businessPhone,
            // additionalInfo: values.additionalInfo,
            marketingListId: values.marketingListId,
            isActive: values.isActive
          };
          await PostCrmMarkMemberList(data)
            .then(res => {
              if (i === leadval.length - 1) {
                props.success();
              }
            })
            .catch(error => props.error());
        });
        props.backmain(1);
        setSubmitting(false);
      }
    }
  }

  // Toast

  function errort(res) {
    // add type: 'error' to options
    return toast.error(res, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      marketingListId: Yup.string().required("List is required"),
      group: Yup.string().required("group is required"),
      // additionalInfo: Yup.string().required("Info is Required"),
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

  let [initialValues, setInitialValues] = useState({
    isActive: true
    // contactId: (props.check)?props.idforparent:0,
  });

  let [marklist, setMarklist] = useState([]);
  let [contact, setContact] = useState([]);
  let [lead, setLead] = useState([]);
  async function getlistapi() {
    const { data: marklist } = await GetCrmMarketingList(0, 0);
    setMarklist(marklist);

    const { data: lead } = await GetCrmLead(0, 0);
    setLead(lead);

    const { data: contact } = await GetCrmContactPerson(0, 0);
    setContact(marklist);

    lead.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      var valbody = {};
      valbody["value"] = e.leadId;
      valbody["name"] = e.name;
      valbody["businessPhone"] = e.businessPhone;
      // valbody["email"] = e.email;
      obj["value"] = valbody;
      if (i === 0) {
        options[0] = obj;
      } else {
        options.push(obj);
      }
    });

    contact.map((e, i) => {
      var obj = {};
      obj["label"] = e.firstName;
      var valbody = {};
      valbody["value"] = e.contactPersonId;
      valbody["name"] = e.firstName;
      valbody["businessPhone"] = e.mobilePhone;
      valbody["email"] = e.email;
      obj["value"] = valbody;
      if (i === 0) {
        optionscont[0] = obj;
      } else {
        optionscont.push(obj);
      }
    });



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

                      <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="group" style={classes.label}>
                                Group
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <FormGroup check inline className="radio">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  id="lead"
                                  name="group"
                                  value={"lead"}
                                  onChange={handleChange}
                                />

                                <Label
                                  check
                                  className="form-check-label"
                                  htmlFor="lead"
                                  for="lead"
                                >
                                  Lead
                                </Label>
                              </FormGroup>
                              <FormGroup check inline className="radio">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  id="contact"
                                  name="group"
                                  value={"contact"}
                                  onChange={handleChange}
                                />
                                <Label
                                  check
                                  className="form-check-label"
                                  htmlFor="contact"
                                  for="contact"
                                >
                                  Contact
                                </Label>
                              </FormGroup>
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
                        hidden={!(values.group === "contact") ? true : false}
                      >
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="marketingListId"
                                style={classes.label}
                              >
                                Contact
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <MultiSelect
                                options={optionscont}
                                selected={contactval}
                                onSelectedChanged={e => {
                                  setcontactval((contactval = e));
                                }}
                                overrideStrings={{
                                  selectSomeItems: "Select Contact...",
                                  allItemsAreSelected: "All Items are Selected",
                                  selectAll: "Select All",
                                  search: "Search"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                      </div>

                      <div
                        className="row mb-1"
                        hidden={!(values.group === "lead") ? true : false}
                      >
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label
                                for="marketingListId"
                                style={classes.label}
                              >
                                Lead
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <MultiSelect
                                options={options}
                                selected={leadval}
                                onSelectedChanged={e => {
                                  setleadval((leadval = e));
                                }}
                                overrideStrings={{
                                  selectSomeItems: "Select List...",
                                  allItemsAreSelected: "All Items are Selected",
                                  selectAll: "Select All",
                                  search: "Search"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
                      </div>

                      {/* <div className="row mb-1">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <Label for="additionalInfo" style={classes.label}>
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
                      </div> */}
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

export default AddCrmMember;
