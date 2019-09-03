import {
  PutPredefInvoiceItemDataById,
  GetAllListingFornominal,
  GetAllListingFordeptcode,
  GetAllListingForcategory,
  GetPredefInvoiceItemDataById
} from "..//shared/predefinvoice";
import React, { Component, useState, useEffect } from "react";
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
import { GetListingForcurrency } from "../../resources/shared/currency";
import { GetAllListingForTaxCode } from "../shared/vatcode";

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

let PredefInvEdit = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  async function onSubmit(values, { setSubmitting, setErrors }) {
    Object.keys(values).map(function(keyName, keyIndex) {
      if(keyName===null){
        values.keyName=editValue.keyName;
      }
    })
   console.log(values)
    await PutPredefInvoiceItemDataById(props.IDforAPI, values)
      .then(() => success())
      .catch(error => errort());
      handleOpen();
      props.refresh();
    setSubmitting(false);
  }

  //Tost

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success() {
    return toast.success("Saved Successfully... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      description: Yup.string()
        .min(2, `Description has to be at least 2 characters`)
        .required("Description is required"),
      sellingPrice: Yup.string().required("Selling Price is required"),
      currencyCode: Yup.string().required("Currency is required")
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

  const [editValue, seteditValue] = useState({
    description: "",
    reference: "",
    nominalCodeId: 0,
    departmentCodeId: 0,
    // sellingPrice: 0,
    currencyCode: '',
    taxCodeId: 0,
    // taxCode: 0,
    recurringPayment: 0,
    atBookingSite: false,
    onDevices: false,
    showPrice: true,
    isActive: true
  });

  let [currency, setCurrency] = useState([]);
  let [nominalcode, setNominalcode] = useState([]);
  let [deptcode, setDeptcode] = useState([]);
  let [groupcat, setGroupcat] = useState([]);
  let [vatcode, setVatcode] = useState([]);

  useEffect(() => {
    getcurrlist();
    getgrouplist();
    getdeptlist();
    getnominallist();
    getvatlist();
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: editValue } = await GetPredefInvoiceItemDataById(props.IDforAPI);
    seteditValue(editValue);
  }

  async function getcurrlist() {
    const { data: currency } = await GetListingForcurrency();
    setCurrency(currency);
  }

  async function getnominallist() {
    const { data: nominalcode } = await GetAllListingFornominal();
    setNominalcode(nominalcode);
  }

  async function getdeptlist() {
    const { data: deptcode } = await GetAllListingFordeptcode();
    setDeptcode(deptcode);
  }

  async function getgrouplist() {
    const { data: groupcat } = await GetAllListingForcategory();
    setGroupcat(groupcat);
  }

  async function getvatlist() {
    const { data: vatcode } = await GetAllListingForTaxCode();
    setVatcode(vatcode);
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

  let [modal, setModal] = useState(true);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size={'lg'}
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">Predefined Invoicing Items</h3>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <Formik
              editValue={editValue}
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
                            <Label for="reference">Reference</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="reference"
                              id="reference"
                              placeholder={editValue.reference}
                              autoComplete="given-name"
                              // valid={!errors.reference}
                              // invalid={touched.reference && !!errors.reference}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.reference}
                            />

                            <FormFeedback>{errors.reference}</FormFeedback>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="productCategoryId"
                              id="productCategoryId"
                              autoComplete="given-name"
                              // valid={!errors.productCategoryId}
                              // invalid={touched.productCategoryId && !!errors.productCategoryId}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.productCategoryId}
                            >
                              <option selected></option>
                              {groupcat.map(e => (
                                <option value={e.productCategoryId}>
                                  {e.name}
                                </option>
                              ))}
                            </Input>

                            {/* <FormFeedback>{errors.productCategoryId}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Nominal code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="nominalCodeId"
                              id="nominalCodeId"
                              autoComplete="given-name"
                              // valid={!errors.nominalCodeId}
                              // invalid={touched.nominalCodeId && !!errors.nominalCodeId}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.nominalCodeId}
                            >
                              <option selected></option>
                              {nominalcode.map(e => (
                                <option value={e.nominalCodeId}>
                                  {e.code} - {e.description}
                                </option>
                              ))}
                            </Input>

                            {/* <FormFeedback>{errors.nominalCodeId}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Department code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="departmentCodeId"
                              id="departmentCodeId"
                              autoComplete="given-name"
                              // valid={!errors.departmentCodeId}
                              // invalid={touched.departmentCodeId && !!errors.departmentCodeId}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.departmentCodeId}
                            >
                              <option selected></option>
                              {deptcode.map(e => (
                                <option value={e.departmentCodeId}>
                                  {e.code} - {e.description}
                                </option>
                              ))}
                            </Input>

                            {/* <FormFeedback>{errors.departmentCodeId}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="description">Description</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="textarea"
                              name="description"
                              id="description"
                              placeholder={editValue.description}
                              autoComplete="given-name"
                              valid={!errors.description}
                              invalid={
                                touched.description && !!errors.description
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />

                            <FormFeedback>{errors.description}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="costPrice">Cost Price</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="costPrice"
                              id="costPrice"
                              placeholder={editValue.costPrice}
                              autoComplete="given-name"
                              maxLength={3}
                              // valid={!errors.costPrice}
                              // invalid={touched.costPrice && !!errors.costPrice}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.costPrice}
                            />

                            {/* <FormFeedback>{errors.costPrice}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sellingPrice">Selling Price</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="sellingPrice"
                              id="sellingPrice"
                              placeholder={editValue.sellingPrice}
                              autoComplete="given-name"
                              maxLength={3}
                              valid={!errors.sellingPrice}
                              invalid={
                                touched.sellingPrice && !!errors.sellingPrice
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.sellingPrice}
                            />

                            <FormFeedback>{errors.sellingPrice}</FormFeedback>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Currency</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="currencyCode"
                              id="currencyCode"
                              autoComplete="given-name"
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
                                <option value={e.currencyCode}>{e.name}</option>
                              ))}
                            </Input>

                            <FormFeedback>{errors.currencyCode}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">VAT</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="taxCodeId"
                              id="taxCodeId"
                              autoComplete="given-name"
                              // valid={!errors.taxCodeId}
                              // invalid={touched.taxCodeId && !!errors.taxCodeId}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.taxCodeId}
                            >
                              <option selected></option>
                              {vatcode.map(e => (
                                <option value={e.taxCodeId}>{e.code}</option>
                              ))}
                            </Input>

                            {/* <FormFeedback>{errors.nominalCodeId}</FormFeedback> */}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Recurrence</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="recurringPayment"
                              id="recurringPayment"
                              valid={!errors.recurringPayment}
                              invalid={
                                touched.recurringPayment &&
                                !!errors.recurringPayment
                              }
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.recurringPayment}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Item requires a recurring payment
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Booking site </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="atBookingSite"
                              id="atBookingSite"
                              valid={!errors.atBookingSite}
                              invalid={
                                touched.atBookingSite && !!errors.atBookingSite
                              }
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.atBookingSite}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Available on booking site
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">On devices</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="onDevices"
                              id="onDevices"
                              valid={!errors.onDevices}
                              invalid={touched.onDevices && !!errors.onDevices}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.onDevices}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              On devices
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Price on Device</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="showPrice"
                              id="showPrice"
                              valid={!errors.showPrice}
                              invalid={touched.showPrice && !!errors.showPrice}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.showPrice}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Show price
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="reference">Active</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="isActive"
                              id="isActive"
                              valid={!errors.isActive}
                              invalid={touched.isActive && !!errors.isActive}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.isActive}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              isActive
                            </label>
                          </div>
                        </div>
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

export default PredefInvEdit;
