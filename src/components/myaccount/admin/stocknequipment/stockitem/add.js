import React, { Component, useState, useEffect } from "react";
// import { PostListingForModel } from "../shared/model";
import { GetListingForProductCategory } from "../shared/productcategory";
import { GetListingForNominalCode } from "../../financial/shared/nominalcode";
import { GetListingForDepartmentCode } from "../../financial/shared/departmentcode";
import { GetListingForWorkSheet } from "../../schedule/shared/worksheet";
// import {GetListingForMake} from '../shared/make';
// import {PostListingForFileUpload} from '..';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Select from "react-select";
import "react-select/dist/react-select.min.css";
//import "../../../../../scss/override/select.scss";
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
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactsListing from '../stockitem/contacts';
import MovementListing from '../stockitem/movements';
import NotesListing from '../stockitem/notes';
import PartsListing from '../stockitem/parts';
import JobsListing from '../stockitem/jobs';

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
  },
  
};

let options = [{}];
let workOKvalue = [];
let workNotOKvalue = [];
let nameoffile=[{}];
let selectedFile=[];
let details = "";

let AddModel = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

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

  let [pCategory, setPCategory] = useState([
    {
      productCategoryId: 0,
      name: ""
    }
  ]);

  let [nCode, setNCode] = useState([
    {
      nominalCodeId: 0,
      code: ""
    }
  ]);

  let [dCode, setDCode] = useState([
    {
      departmentCodeId: 0,
      code: ""
    }
  ]);

  let [worksheet, setWorksheet] = useState([
    {
      worksheetId: 0,
      name: ""
    }
  ]);

  let [make, setMake] = useState([
    {
      makeId: 0,
      name: ""
    }
  ]);

  useEffect(() => {
    getinitiallist();
    options = [];
    selectedFile=[];
    nameoffile=[];
  }, []);

  async function getinitiallist() {

    const { data: pCategory } = await GetListingForProductCategory(0, 0);
    setPCategory(pCategory);

    const { data: nCode } = await GetListingForNominalCode(0, 0);
    setNCode(nCode);

    const { data: dCode } = await GetListingForDepartmentCode(0, 0);
    setDCode(dCode);

    const { data: worksheet } = await GetListingForWorkSheet(0, 0);
    setWorksheet(worksheet);

    // const { data: make } = await GetListingForMake(0, 0);
    // setMake(make);

    //Multi Select Code

    worksheet.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.name;
      if (i === 0) {
        options[0] = obj;
      } else {
        options.push(obj);
      }
    });
  }
  function saveChanges(value) {
    value.map((e, i) => {
      workOKvalue[i] = e.value;
    });
  }
    function saveChangesNot(value) {
      value.map((e, i) => {
        workNotOKvalue[i] = e.value;
      });
    }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    if(!(workOKvalue===[])){
      values.worksheetsOk=JSON.stringify(workOKvalue);
    }
    if(!(workNotOKvalue===[])){
      values.worksheetsNotOk=JSON.stringify(workNotOKvalue);
    }

    selectedFile.map(async (e,i)=>{
      let formdata = new FormData();
      formdata.append(e.name,e);
      var obj = {};
      pCategory.map(n=>{
        if(n.productCategoryId===parseInt(values.productCategoryId)){
          obj["type"] = n.name;
          console.log(n.name)
        }
      })
      obj["name"] = e.name;
      if(values.attachments===[]){
        values.attachments[0]=obj;
      }
      else{
        values.attachments.push(obj)
      }
    //   await PostListingForFileUpload(formdata);
    })



    // await PostListingForModel(values)
    //   .then(() => success())
    //   .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      productCategoryId: Yup.string().required("Category is requierd"),
      makeId: Yup.string().required("Make is requierd"),
      modelNumber: Yup.string().required("ModelNumber is requierd"),
      name: Yup.string().required("Make is requierd")
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
    // productCategoryId: 0,
    // name: "",
    // makeId: 0,
    // makeName: "",
    // nominalCodeId: 0,
    // departmentCodeId: 0,
    // modelNumber: "",
    // consumable: true,
    // size: 0,
    // weight: 0,
    // worksheetsOk: "",
    // worksheetsNotOk: "",
    // batchNumber: "",
    // stockCode: "",
    // sellingPrice: 0,
    // notes: "",
    // isActive: true,
    attachments: []
  });

  let [filen, setFilen] = useState(false);

  let handleFileSelect = event => {
    setFilen(false);
    if(selectedFile===[]){
      selectedFile[0]=event.target.files[0]
    }
    else{
      selectedFile.push(event.target.files[0])
    }
     console.log(selectedFile)
     setTimeout(() => {
      setFilen(true);
     }, 1000);
  };

  if (filen) {
    nameoffile = selectedFile;
  } else {
    nameoffile = [{}];
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

  details =(<Formik
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
                <Label for="group">Product Category</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="select"
                    name="productCategoryId"
                    id="productCategoryId"
                    placeholder="e.g. Accommodation, Travel etc..."
                    autoComplete="given-name"
                    valid={!errors.productCategoryId}
                    invalid={
                    touched.productCategoryId &&
                    !!errors.productCategoryId
                    }
                    autoFocus={true}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productCategoryId}
                >
                    <option selected></option>
                    {pCategory.map(e => (
                    <option value={e.productCategoryId}>
                        {e.name}
                    </option>
                    ))}
                </Input>
                <FormFeedback>
                    {errors.productCategoryId}
                </FormFeedback>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="nominalCodeId">Nominal Code</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Input
                    type="select"
                    name="nominalCodeId"
                    id="nominalCodeId"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.nominalCodeId}
                    // invalid={touched.nominalCodeId && !!errors.nominalCodeId}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.nominalCodeId}
                >
                    <option selected></option>
                    {nCode.map(e => (
                    <option value={e.nominalCodeId}>
                        {e.code}
                    </option>
                    ))}
                </Input>
                {/* <FormFeedback>{errors.nominalCodeId}</FormFeedback> */}
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="departmentCodeId">
                    Department Code
                </Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Input
                    type="select"
                    name="departmentCodeId"
                    id="departmentCodeId"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.departmentCodeId}
                    // invalid={touched.departmentCodeId && !!errors.departmentCodeId}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.departmentCodeId}
                >
                    <option selected></option>
                    {dCode.map(e => (
                    <option value={e.departmentCodeId}>
                        {e.code}
                    </option>
                    ))}
                </Input>
                {/* <FormFeedback>{errors.departmentCodeId}</FormFeedback> */}
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="makeId">Make</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="select"
                    name="makeId"
                    id="makeId"
                    placeholder="e.g. Taxi, train, Fuel etc..."
                    autoComplete="given-name"
                    valid={!errors.makeId}
                    invalid={touched.makeId && !!errors.makeId}
                    autoFocus={true}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.makeId}
                >
                    <option selected></option>
                    {make.map(e => (
                    <option value={e.makeId}>
                        {e.name}
                    </option>
                    ))}
                    </Input>
                <FormFeedback>{errors.makeName}</FormFeedback>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="name">Model</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="e.g. Taxi, train, Fuel etc..."
                    autoComplete="given-name"
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
                <Label for="modelNumber">Model Number</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="text"
                    name="modelNumber"
                    id="modelNumber"
                    placeholder="e.g. Taxi, train, Fuel etc..."
                    autoComplete="given-name"
                    valid={!errors.modelNumber}
                    invalid={
                    touched.modelNumber && !!errors.modelNumber
                    }
                    autoFocus={true}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.modelNumber}
                />
                <FormFeedback>{errors.modelNumber}</FormFeedback>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="consumable">Consumable</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <input
                    name="consumable"
                    id="consumable"
                    // valid={!errors.consumable}
                    // invalid={touched.consumable && !!errors.consumable}
                    onClick={handleChange}
                    // onBlur={handleBlur}
                    value={values.consumable}
                    defaultChecked={initialValues.consumable}
                    type="checkbox"
                />
                &nbsp;&nbsp;&nbsp;
                <label
                    className="form-check-label"
                    for="defaultCheck1"
                >
                    Consumable
                </label>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Label for="size">Size (m3)</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Input
                        type="number"
                        name="size"
                        id="size"
                        // placeholder="e.g. Taxi, train, Fuel etc..."
                        // autoComplete="given-name"
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
                    {/* <FormFeedback>
                        {errors.size}
                    </FormFeedback> */}
                    </div>
                </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="modelNumber">Weight (kg)</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                    <Input
                        type="number"
                        name="weight"
                        id="weight"
                        // placeholder="e.g. 0"
                        // autoComplete="given-name"
                        // valid={!errors.weight}
                        // invalid={
                        //   touched.weight && !!errors.weight
                        // }
                        // autoFocus={true}
                        // required
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        value={values.weight}
                    />
                    {/* <FormFeedback>
                        {errors.weight}
                    </FormFeedback> */}
                    </div>
                </div>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="worksheetsOk">
                    Worksheet to fill if movement OK
                </Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Select
                    name="form-field-name2"
                    value={workOKvalue}
                    options={options}
                    onChange={saveChanges}
                    multi
                />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="worksheetsNotOk">
                    Worksheet to fill if movement Not OK
                </Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Select
                    name="form-field-name2"
                    value={workNotOKvalue}
                    options={options}
                    onChange={saveChangesNot}
                    multi
                />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="batchNumber">Batch Number</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="text"
                    name="batchNumber"
                    id="batchNumber"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.batchNumber}
                    // invalid={
                    //   touched.batchNumber && !!errors.batchNumber
                    // }
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.batchNumber}
                />
                {/* <FormFeedback>{errors.batchNumber}</FormFeedback> */}
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="stockCode">Stock Code</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="text"
                    name="stockCode"
                    id="stockCode"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.stockCode}
                    // invalid={touched.stockCode && !!errors.stockCode}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.stockCode}
                />
                {/* <FormFeedback>{errors.stockCode}</FormFeedback> */}
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="sellingPrice">Selling price</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                <Input
                    type="number"
                    name="sellingPrice"
                    id="sellingPrice"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.sellingPrice}
                    // invalid={
                    //   touched.sellingPrice && !!errors.sellingPrice
                    // }
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.sellingPrice}
                />
                {/* <FormFeedback>{errors.sellingPrice}</FormFeedback> */}
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                {/* <Input
                    type="select"
                    name="currency"
                    id="currency"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.currency}
                    // invalid={touched.currency && !!errors.currency}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.currency}
                >
                    <option value="AED">AED</option>
                    <option value="AED">AUD</option>
                    <option value="AED">BGN</option>
                    <option value="AED">CAD</option>
                    <option value="AED">CHF</option>
                    <option value="AED">CZK</option>
                    <option value="AED">DKK</option>
                    <option value="AED">EUR</option>
                    <option value="AED">GBP</option>
                    <option value="AED">HUF</option>
                    <option value="AED">ILS</option>
                    <option value="AED">LTL</option>
                    <option value="AED">LVL</option>
                    <option value="AED">MXN</option>
                    <option value="AED">NOK</option>
                    <option value="AED">PLN</option>
                    <option value="AED">RON</option>
                    <option value="AED">RUB</option>
                    <option value="AED">SEK</option>
                    <option value="AED">USD</option>
                    <option value="AED">ZAR</option>
                </Input> */}
                </div>

                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                <Label for="vatCode">VAT Code</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Input
                    type="select"
                    name="vatCode"
                    id="vatCode"
                    // placeholder=""
                    // autoComplete="given-name"
                    // valid={!errors.vatCode}
                    // invalid={touched.vatCode && !!errors.vatCode}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.vatCode}
                >
                    <option value="T1">T1</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="T4">T4</option>
                    <option value="T5">T5</option>
                    <option value="T6">T6</option>
                    <option value="T7">T7</option>
                    <option value="T8">T8</option>
                    <option value="T9">T9</option>
                    <option value="T10">T10</option>
                    <option value="T11">T11</option>
                    <option value="T12">T12</option>
                    <option value="T0">T0</option>
                </Input>
                </div>*/}
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="notes">Notes</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="textarea"
                    name="notes"
                    id="notes"
                    // placeholder=" "
                    // autoComplete="given-name"
                    // valid={!errors.notes}
                    // invalid={touched.notes && !!errors.notes}
                    // autoFocus={true}
                    // required
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.notes}
                />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <Label for="attachments">Attachments</Label>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                <Input
                    type="file"
                    name="attachments"
                    id="attachments"
                    // placeholder="i.e. "
                    // autoComplete="given-name"
                    // valid={!errors.reference}
                    // invalid={touched.reference && !!errors.reference}
                    // autoFocus={true}
                    // required
                    onChange={handleFileSelect}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.attachments}
                />
                <Label for="name">
                    Choose A File to Attach
                </Label>

                {nameoffile.map((e,i) => (
                    <p>
                    {nameoffile[i].name}
                    </p>
                ))}
                {/* <FormFeedback>{errors.reference}</FormFeedback> */}
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
                    valid={!errors.active}
                    invalid={touched.active && !!errors.active}
                    onClick={handleChange}
                    onBlur={handleBlur}
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
/>)

  const Handlechange = name => event => {
    setInitialValues(...initialValues, ([name] = event.target.value));
  };

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

  let changeColor = (e) =>{
      console.log("nhkshdkjhskdfhsjkdhkas")
  }
  

  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x"></i>
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="lg"
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">Manage Model</h3>
          
        </ModalHeader>
        <ModalBody
            style={{ "max-height": "calc(100vh - 150px)", "overflow-y": "auto" }}
        >
            <Tabs defaultActiveKey="detail" transition={false} id="noanim-tab-example" className={classes.myclass}>
                <Tab eventKey="detail" title="Detailt">
                {details}
                </Tab>
                <Tab eventKey="parts" title="Parts" onSelect={(event) => changeColor(event)}>
                    <PartsListing />
                </Tab>
                <Tab eventKey="jobs" title="Jobs" >
                    <JobsListing />
                </Tab>
                <Tab eventKey="movement" title="Movement">
                    <MovementListing />
                </Tab>
                <Tab eventKey="notes" title="Notes" >
                    <NotesListing />
                </Tab>
                <Tab eventKey="contacts" title="Contacts">
                    <ContactsListing />
                </Tab>
                
            </Tabs>
            <div className="container">
            
            </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddModel;
