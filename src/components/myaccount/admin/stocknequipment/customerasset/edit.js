import React, { Component, useState, useEffect } from "react";
import {
  GetCustomerAssetDataById,
  GetListingForCustomerAsset,
  PutCustomerAssetDataById,
  PostListingForFileUpload
} from "..//shared/customerasset";

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
import { GetListingForModel } from "../shared/model";
import { GetListingForStorageLocation } from "../shared/storagelocation";
import { GetListingForcurrency } from "../../resources/shared/currency";
import { GetListingForTaxCode } from "../../financial/shared/vatcode";
import { GetListingForUnit } from "../shared/unit";
import { DropzoneArea } from "material-ui-dropzone";
import { GetModelDataById } from "../shared/model";
import { GetListingForAssetType } from "../shared/customerassettype";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import "../../../../../scss/override/select.scss";
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
let optiontype = [];
let optionsmodel = [];
let EditCustomerAssets = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(files === [])) {
      files.map(async e => {
        let formdata = new FormData();
        formdata.append(e.name, e);
        await PostListingForFileUpload(formdata);
      });

      await PutCustomerAssetDataById(props.IDforAPI, values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    } else {
      await PutCustomerAssetDataById(props.IDforAPI, values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    }
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      modelId: Yup.string().required("Name is required"),
      quantity: Yup.string().required("Name is required")
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

  useEffect(() => {
    settabledistatus(false);
    getlistapi();
  }, []);

  let [model, setModel] = useState([]);
  let [supplier, setSupplier] = useState([]);
  // let [storage, setStorage] = useState([]);
  let [unit, setUnit] = useState([]);
  // let [currency, setCurrency] = useState([]);
  // let [tax, setTax] = useState([]);
  let [files, setFiles] = useState([]);
  let [makeshow, setMakeShow] = useState(true);
  let [productCat, setProductCat] = useState("-");
  let [make, setMake] = useState("-");
  let [datamodel, setdataModel] = useState();
  let [assettype, setAssettype] = useState();

  async function getlistapi() {
    const { data: initialValues } = await GetCustomerAssetDataById(
      props.IDforAPI
    );
    setInitialValues(initialValues);

    const { data: model } = await GetListingForModel(0, 0);
    setModel(model);

    const { data: supplier } = await GetListingForCustomerAsset(0, 0);
    setSupplier(supplier);

    // const { data: storage } = await GetListingForStorageLocation(0, 0);
    // setStorage(storage);

    const { data: unit } = await GetListingForUnit(0, 0);
    setUnit(unit);

    // const { data: currency } = await GetListingForcurrency(0, 0);
    // setCurrency(currency);

    // const { data: tax } = await GetListingForTaxCode(0, 0);
    // setTax(tax);

    const { data: assettype } = await GetListingForAssetType(0, 0);
    setAssettype(assettype);

    //Multi Select Code  asset type

    assettype.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.customerAssetTypeId;
      if (i === 0) {
        optiontype[0] = obj;
      } else {
        optiontype.push(obj);
      }
    });

    //Multi Select Code Parent asset

    supplier.map((e, i) => {
      e.parentAssetId = e.customerAssetId;
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.parentAssetId;
      if (i === 0) {
        options[0] = obj;
      } else {
        options.push(obj);
      }
    });

    //Multi Select Code optionsmodel

    model.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.modelId;
      if (i === 0) {
        optionsmodel[0] = obj;
      } else {
        optionsmodel.push(obj);
      }
    });

    if (!(initialValues.installDate === null)) {
      initialValues.installDate = initialValues.installDate.substr(
        0,
        initialValues.installDate.length - 9
      );
    }
    if (!(initialValues.warrantyExpiry === null)) {
      initialValues.warrantyExpiry = initialValues.warrantyExpiry.substr(
        0,
        initialValues.warrantyExpiry.length - 9
      );
    }

    settabledistatus(true);
  }

  async function handlemake(event) {
    if (!makeshow) {
      setMakeShow(true);
    }
    const { data: datamodel } = await GetModelDataById(event);
    setdataModel(datamodel);
    setProductCat(datamodel.productCategoryName);
    setMake(datamodel.makeName);
    setMakeShow(false);
  }

  function handleChangefile(files) {
    setFiles((files = files));
  }

  let [initialValues, setInitialValues] = useState({
    name: "",
    // imagePath: "",
    // order: 0,
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
                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="modelId">Model</Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Select
                                    name="modelId"
                                    id="modelId"
                                    options={optionsmodel}
                                    valid={!errors.modelId}
                                    invalid={
                                      touched.modelId && !!errors.modelId
                                    }
                                    autoFocus={true}
                                    required
                                    onChange={e => {
                                      if (!(e === null)) {
                                        values.modelId = e.value;
                                      } else {
                                        values.modelId = null;
                                      }
                                      handleBlur();
                                      if (e != null) {
                                        handlemake(e.value);
                                      } else {
                                        setMakeShow(true);
                                      }
                                    }}
                                    onBlur={handleBlur}
                                    value={values.modelId}
                                    multi={false}
                                  />
                                  <p style={classes.validate}>
                                    {errors.modelId ? "Model is Required" : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="customerAssetTypeId">
                                    Asset Type
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Select
                                    name="customerAssetTypeId"
                                    id="customerAssetTypeId"
                                    options={optiontype}
                                    // valid={!errors.customerAssetTypeId}
                                    // invalid={
                                    //   touched.customerAssetTypeId &&
                                    //   !!errors.customerAssetTypeId
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={e => {
                                      if (!(e === null)) {
                                        values.customerAssetTypeId = e.value;
                                      } else {
                                        values.customerAssetTypeId = null;
                                      }
                                      handleBlur();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.customerAssetTypeId}
                                    multi={false}
                                  />
                                  {/* <p style={classes.validate}>
                                {errors.customerAssetTypeId
                                  ? "Customer Asset Type is Required"
                                  : ""}
                              </p> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="row mb-2"
                            hidden={makeshow ? true : false}
                            style={classes.makeshow}
                          >
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label>Make</Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  {make}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label>Product Category</Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  {productCat}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="name">Asset Name</Label>
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
                                  <Label for="parentAssetId">
                                    Parent Asset
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Select
                                    name="parentAssetId"
                                    id="parentAssetId"
                                    options={options}
                                    // valid={!errors.parentAssetId}
                                    // invalid={
                                    //   touched.parentAssetId &&
                                    //   !!errors.parentAssetId
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={e => {
                                      if (!(e === null)) {
                                        values.parentAssetId = e.value;
                                      } else {
                                        values.parentAssetId = null;
                                      }
                                      handleBlur();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.parentAssetId}
                                    multi={false}
                                  />
                                  {/* <p style={classes.validate}>
                                {errors.parentAssetId
                                  ? "Supplier is Required"
                                  : ""}
                              </p> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="customerAssetCode">
                                    Asset Code
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="customerAssetCode"
                                    id="customerAssetCode"
                                    // placeholder="i.e. Skip"
                                    autoComplete={false}
                                    // valid={!errors.customerAssetCode}
                                    // invalid={
                                    //   touched.customerAssetCode &&
                                    //   !!errors.customerAssetCode
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.customerAssetCode}
                                  />
                                  {/* <FormFeedback>
                                    {errors.customerAssetCode}
                                  </FormFeedback> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="barCode">Bar Code</Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="barCode"
                                    id="barCode"
                                    // placeholder="i.e. Skip"
                                    autoComplete={false}
                                    // valid={!errors.barCode}
                                    // invalid={
                                    //   touched.barCode && !!errors.barCode
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.barCode}
                                  />
                                  {/* <FormFeedback>{errors.barCode}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="quantity">Quantity</Label>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.quantity}
                                    // invalid={
                                    //   touched.quantity && !!errors.quantity
                                    // }
                                    // autoFocus={true}
                                    // required
                                    autoComplete={false}
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.quantity}
                                  />
                                  {/* <FormFeedback>{errors.quantity}</FormFeedback> */}
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                                  <Label for="unitId">Unit</Label>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Input
                                    type="select"
                                    name="unitId"
                                    id="unitId"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.unitId}
                                    // invalid={touched.unitId && !!errors.unitId}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.unitId}
                                  >
                                    <option selected></option>
                                    {unit.map(e => (
                                      <option value={e.unitId}>{e.name}</option>
                                    ))}
                                  </Input>
                                  {/* <FormFeedback>{errors.unitId}</FormFeedback> */}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="size">Size</Label>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Input
                                    type="text"
                                    name="size"
                                    id="size"
                                    // placeholder="i.e. Skip"
                                    autoComplete={false}
                                    // valid={!errors.size}
                                    // invalid={
                                    //   touched.size && !!errors.size
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.size}
                                  />
                                  {/* <FormFeedback>{errors.size}</FormFeedback> */}
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                                  <Label for="condition">Condition</Label>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                  <Input
                                    type="text"
                                    name="condition"
                                    id="condition"
                                    // placeholder="i.e. Skip"
                                    autoComplete={false}
                                    // valid={!errors.condition}
                                    // invalid={
                                    //   touched.condition && !!errors.condition
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.condition}
                                  />
                                  {/* <FormFeedback>
                                    {errors.condition}
                                  </FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="serialNumber">
                                    Serial Number
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="serialNumber"
                                    id="serialNumber"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.serialNumber}
                                    // invalid={touched.serialNumber && !!errors.serialNumber}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.serialNumber}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="siteLocation">
                                    Site Location
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="text"
                                    name="siteLocation"
                                    id="siteLocation"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.siteLocation}
                                    // invalid={
                                    //   touched.siteLocation && !!errors.siteLocation
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.siteLocation}
                                  />
                                  {/* <FormFeedback>{errors.siteLocation}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="installDate">Install Date</Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="date"
                                    name="installDate"
                                    id="installDate"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.installDate}
                                    // invalid={touched.installDate && !!errors.installDate}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.installDate}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                  <Label for="warrantyExpiry">
                                    Warranty Expiry
                                  </Label>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                  <Input
                                    type="date"
                                    name="warrantyExpiry"
                                    id="warrantyExpiry"
                                    // placeholder="i.e. Skip"
                                    // autoComplete="given-name"
                                    // valid={!errors.warrantyExpiry}
                                    // invalid={
                                    //   touched.warrantyExpiry && !!errors.warrantyExpiry
                                    // }
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.warrantyExpiry}
                                  />
                                  {/* <FormFeedback>{errors.warrantyExpiry}</FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div className="row">
                                <div className="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1">
                                  <Label for="notes">Notes</Label>
                                </div>
                                <div
                                  className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10"
                                  style={classes.notes}
                                >
                                  <Input
                                    type="textarea"
                                    name="notes"
                                    id="notes"
                                    // placeholder="i.e. Skip"
                                    autoComplete={false}
                                    // valid={!errors.notes}
                                    // invalid={touched.notes && !!errors.notes}
                                    // autoFocus={true}
                                    // required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.notes}
                                  />
                                  {/* <FormFeedback>
                                    {errors.taxCodeId}
                                  </FormFeedback> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>

                        <Tab
                          eventKey="attachment"
                          title="Attachments"
                          // onSelect={event => changeColor(event)}
                        >
                          <div className="container">
                            <DropzoneArea
                              onChange={handleChangefile}
                              acceptedFiles={[
                                "image/jpeg",
                                "image/png",
                                "image/bmp"
                              ]}
                              showPreviews={false}
                              maxFileSize={5000000}
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

export default EditCustomerAssets;
