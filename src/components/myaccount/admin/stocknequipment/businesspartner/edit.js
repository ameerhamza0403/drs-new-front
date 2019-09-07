import React, { Component, useState, useEffect } from "react";
import { GetListingForNominalCode } from "../../financial/shared/nominalcode";
import { GetListingForPaymentTerm } from "../shared/paymentterm";
import { GetListingForVendorGroup } from "../shared/vendorgroup";
import { GetListingForLocation } from "../shared/location";
import { GetListingForcurrency } from "../../resources/shared/currency";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Divider from "@material-ui/core/Divider";
import {
  GetbusinessPartnerDataById,
  PutbusinessPartnerDataById
} from "..//shared/businesspartner";
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
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const classes = {
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
  }
};

let EditMake = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Toast

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success(response) {
    if (response == "Exception Error") {
      return toast.error('Failed with Error "' + response + '"', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      return toast.success(response, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  async function onSubmit(values, { setSubmitting, setErrors }) {
    await PutbusinessPartnerDataById(props.IDforAPI, values)
      .then(res => success(res.data.message))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .min(2, `Supplier has to be at least 2 characters`)
        .required("Supplier is required"),
      vendorGroupId: Yup.string()
      .required("Vendor is required"),
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

  const [initialValues, setInitialValues] = useState({
    name: "",
    isActive: true
  });

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
  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  let [vendergroup, setVendorGroup] = useState([]);
  let [location, setLocation] = useState([]);
  let [currency, setCurrency] = useState([]);
  let [nominal, setNominal] = useState([]);
  let [payment, setPayment] = useState([]);

  useEffect(() => {
    setVendorGroup([]);
    setLocation([]);
    setCurrency([]);
    setNominal([]);
    setPayment([]);
    setInitialValues([]);
    getinitiallist();
    getlistapi();
  }, []);

  async function getinitiallist() {
    const { data: vendergroup } = await GetListingForVendorGroup(0, 0);
    setVendorGroup(vendergroup);

    const { data: location } = await GetListingForLocation(0, 0);
    setLocation(location);

    const { data: currency } = await GetListingForcurrency();
    setCurrency(currency);

    const { data: nominal } = await GetListingForNominalCode(0, 0);
    setNominal(nominal);

    const { data: payment } = await GetListingForPaymentTerm(0, 0);
    setPayment(payment);
  }

  async function getlistapi() {
    const { data: initialValues } = await GetbusinessPartnerDataById(
      props.IDforAPI
    );
    setInitialValues(initialValues);
    setModal(true);
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="lg"
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">Manage Supplier</h3>
        </ModalHeader>
        <ModalBody
          style={{
            "min-height": "calc(100vh - 150px)",
            "max-height": "calc(100vh - 150px)",
            overflow: "auto"
          }}
        >
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
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Supplier Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder=" "
                              autoComplete="off"
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

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="businessPartnerCode">
                              Supplier Code
                            </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="text"
                              name="businessPartnerCode"
                              id="businessPartnerCode"
                              placeholder=" "
                              autoComplete="off"
                              // valid={!errors.businessPartnerCode}
                              // invalid={
                              //   touched.businessPartnerCode &&
                              //   !!errors.businessPartnerCode
                              // }
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.businessPartnerCode}
                            />
                            {/* <FormFeedback>{errors.businessPartnerCode}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="nominalCodeId">Vendor Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="select"
                              name="vendorGroupId"
                              id="vendorGroupId"
                              // placeholder=""
                              autoComplete="off"
                              valid={!errors.vendorGroupId}
                              invalid={touched.vendorGroupId && !!errors.vendorGroupId}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.vendorGroupId}
                            >
                              <option selected></option>
                              {vendergroup.map(e => (
                                <option value={e.vendorGroupId}>
                                  {e.name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback>{errors.vendorGroupId}</FormFeedback>
                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="departmentCodeId">Location</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="select"
                              name="locationId"
                              id="locationId"
                              // placeholder=""
                              autoComplete="off"
                              // valid={!errors.locationId}
                              // invalid={touched.locationId && !!errors.locationId}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.locationId}
                            >
                              <option selected></option>
                              {location.map(e => (
                                <option value={e.locationId}>{e.name}</option>
                              ))}
                            </Input>
                            {/* <FormFeedback>{errors.departmentCodeId}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="currency">Currency</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Input
                              type="select"
                              name="currency"
                              id="currency"
                              // placeholder=""
                              autoComplete="off"
                              // valid={!errors.currency}
                              // invalid={touched.currency && !!errors.currency}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.currency}
                            >
                              <option selected></option>
                              {currency.map(e => (
                                <option value={e.code}>{e.code}</option>
                              ))}
                            </Input>
                            {/* <FormFeedback>{errors.departmentCodeId}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <input
                              name="active"
                              id="active"
                              // valid={!errors.active}
                              // invalid={touched.active && !!errors.active}

                              onClick={handleChange}
                              // onBlur={handleBlur}
                              value={values.active}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Active
                            </label>
                          </div>
                        </div>
                        <br />

                        <Divider />

                        <br />
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
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="tel1">Telephone 1</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="tel1"
                                  id="tel1"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.tel1}
                                  // invalid={
                                  //   touched.tel1 &&
                                  //   !!errors.tel1
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.tel1}
                                />
                                {/* <FormFeedback>{errors.tel1}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="tel2">Telephone 2</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="tel2"
                                  id="tel2"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.tel2}
                                  // invalid={
                                  //   touched.tel2 &&
                                  //   !!errors.tel2
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.tel2}
                                />
                                {/* <FormFeedback>{errors.tel2}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="mobile">Mobile</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="mobile"
                                  id="mobile"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.mobile}
                                  // invalid={
                                  //   touched.mobile &&
                                  //   !!errors.mobile
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.mobile}
                                />
                                {/* <FormFeedback>{errors.mobile}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="email">Email</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="email"
                                  id="email"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.email}
                                  // invalid={
                                  //   touched.email &&
                                  //   !!errors.email
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.email}
                                />
                                {/* <FormFeedback>{errors.email}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="website">Website</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="website"
                                  id="website"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.website}
                                  // invalid={
                                  //   touched.website &&
                                  //   !!errors.website
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.website}
                                />
                                {/* <FormFeedback>{errors.website}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="type">Type</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="select"
                                  name="type"
                                  id="type"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.type}
                                  // invalid={
                                  //   touched.type &&
                                  //   !!errors.type
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.type}
                                >
                                  <option selected />
                                  <option value={"Individual"}>
                                    Individual
                                  </option>
                                  <option value={"Company"}>Company</option>
                                </Input>
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="contactperson" title="Contact Person">
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPerson">
                                  Contact Person
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPerson"
                                  id="contactPerson"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPerson}
                                  // invalid={
                                  //   touched.contactPerson &&
                                  //   !!errors.contactPerson
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPerson}
                                />
                                {/* <FormFeedback>{errors.contactPerson}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPersonMobile">
                                  Contact Person Mobile
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPersonMobile"
                                  id="contactPersonMobile"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPersonMobile}
                                  // invalid={
                                  //   touched.contactPersonMobile &&
                                  //   !!errors.contactPersonMobile
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPersonMobile}
                                />
                                {/* <FormFeedback>{errors.contactPersonMobile}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="title">Title</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="title"
                                  id="title"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.title}
                                  // invalid={
                                  //   touched.title &&
                                  //   !!errors.title
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.title}
                                />
                                {/* <FormFeedback>{errors.title}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="position">Position</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="position"
                                  id="position"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.position}
                                  // invalid={
                                  //   touched.position &&
                                  //   !!errors.position
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.position}
                                />
                                {/* <FormFeedback>{errors.position}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPersonAddress">
                                  Contact Person Address
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPersonAddress"
                                  id="contactPersonAddress"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPersonAddress}
                                  // invalid={
                                  //   touched.contactPersonAddress &&
                                  //   !!errors.contactPersonAddress
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPersonAddress}
                                />
                                {/* <FormFeedback>{errors.contactPersonAddress}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPersonTel">
                                  Contact Person Tel.
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPersonTel"
                                  id="contactPersonTel"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPersonTel}
                                  // invalid={
                                  //   touched.contactPersonTel &&
                                  //   !!errors.contactPersonTel
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPersonTel}
                                />
                                {/* <FormFeedback>{errors.contactPersonTel}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPersonFax">
                                  Contact Person Fax
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPersonFax"
                                  id="contactPersonFax"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPersonFax}
                                  // invalid={
                                  //   touched.contactPersonFax &&
                                  //   !!errors.contactPersonFax
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPersonFax}
                                />
                                {/* <FormFeedback>{errors.contactPersonFax}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="contactPersonEmail">
                                  Contact Person Email
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="contactPersonEmail"
                                  id="contactPersonEmail"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.contactPersonEmail}
                                  // invalid={
                                  //   touched.contactPersonEmail &&
                                  //   !!errors.contactPersonEmail
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.contactPersonEmail}
                                />
                                {/* <FormFeedback>{errors.contactPersonEmail}</FormFeedback> */}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="address" title="Address">
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="billToCity">Billing City</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="billToCity"
                                  id="billToCity"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.billToCity}
                                  // invalid={
                                  //   touched.billToCity &&
                                  //   !!errors.billToCity
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.billToCity}
                                />
                                {/* <FormFeedback>{errors.billToCity}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="billToCountry">
                                  Billing Country
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="billToCountry"
                                  id="billToCountry"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.billToCountry}
                                  // invalid={
                                  //   touched.billToCountry &&
                                  //   !!errors.billToCountry
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.billToCountry}
                                />
                                {/* <FormFeedback>{errors.billToCountry}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="billToStreet">Billing Street</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="billToStreet"
                                  id="billToStreet"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.billToStreet}
                                  // invalid={
                                  //   touched.billToStreet &&
                                  //   !!errors.billToStreet
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.billToStreet}
                                />
                                {/* <FormFeedback>{errors.billToStreet}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="billToPostalCode">
                                  Billing Postal/Zip Code
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="billToPostalCode"
                                  id="billToPostalCode"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.billToPostalCode}
                                  // invalid={
                                  //   touched.billToPostalCode &&
                                  //   !!errors.billToPostalCode
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.billToPostalCode}
                                />
                                {/* <FormFeedback>{errors.billToPostalCode}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="shipToCity">Ship To City</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="shipToCity"
                                  id="shipToCity"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.shipToCity}
                                  // invalid={
                                  //   touched.shipToCity &&
                                  //   !!errors.shipToCity
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.shipToCity}
                                />
                                {/* <FormFeedback>{errors.shipToCity}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="shipToCountry">
                                  Ship To Country
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="shipToCountry"
                                  id="shipToCountry"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.shipToCountry}
                                  // invalid={
                                  //   touched.shipToCountry &&
                                  //   !!errors.shipToCountry
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.shipToCountry}
                                />
                                {/* <FormFeedback>{errors.shipToCountry}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="shipToStreet">Ship To Street</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="shipToStreet"
                                  id="shipToStreet"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.shipToStreet}
                                  // invalid={
                                  //   touched.shipToStreet &&
                                  //   !!errors.shipToStreet
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.shipToStreet}
                                />
                                {/* <FormFeedback>{errors.shipToStreet}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="shipToPostalCode">
                                  Shipping Postal/Zip Code
                                </Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="shipToPostalCode"
                                  id="shipToPostalCode"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.shipToPostalCode}
                                  // invalid={
                                  //   touched.shipToPostalCode &&
                                  //   !!errors.shipToPostalCode
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.shipToPostalCode}
                                />
                                {/* <FormFeedback>{errors.shipToPostalCode}</FormFeedback> */}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="payment" title="Payment Terms">
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="creditLimit">Credit Limit</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="creditLimit"
                                  id="creditLimit"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.creditLimit}
                                  // invalid={
                                  //   touched.creditLimit &&
                                  //   !!errors.creditLimit
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.creditLimit}
                                />
                                {/* <FormFeedback>{errors.creditLimit}</FormFeedback> */}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="paymentTermId">Payment Term</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="select"
                                  name="paymentTermId"
                                  id="paymentTermId"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.paymentTermId}
                                  // invalid={
                                  //   touched.paymentTermId &&
                                  //   !!errors.paymentTermId
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.paymentTermId}
                                >
                                  <option selected />
                                  {payment.map(e => (
                                    <option value={e.paymentTermId}>
                                      {e.name}
                                    </option>
                                  ))}
                                </Input>
                                {/* <FormFeedback>{errors.paymentTermId}</FormFeedback> */}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="accounting" title="Accounting">
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="nominalCodeId">Nominal Code</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="select"
                                  name="nominalCodeId"
                                  id="nominalCodeId"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.nominalCodeId}
                                  // invalid={
                                  //   touched.nominalCodeId &&
                                  //   !!errors.nominalCodeId
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.nominalCodeId}
                                >
                                  <option selected />
                                  {nominal.map(e => (
                                    <option value={e.nominalCodeId}>
                                      {e.code}
                                    </option>
                                  ))}
                                </Input>
                                {/* <FormFeedback>{errors.nominalCodeId}</FormFeedback> */}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="remarks" title="Remarks">
                            <div className="row mb-2">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <Label for="remarks">Remarks</Label>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                                <Input
                                  type="text"
                                  name="remarks"
                                  id="remarks"
                                  placeholder=" "
                                  autoComplete="off"
                                  // valid={!errors.remarks}
                                  // invalid={
                                  //   touched.remarks &&
                                  //   !!errors.remarks
                                  // }
                                  // autoFocus={true}
                                  // required
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values.remarks}
                                />
                                {/* <FormFeedback>{errors.remarks}</FormFeedback> */}
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </FormGroup>
                      <FormGroup>
                        <ModalFooter>
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
                            onClick={handleOpen}
                            style={classes.button}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              )}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditMake;
