import React, { Component, useState, useEffect } from "react";
import {
  PostListingForStockItem,
  PostListingForFileUpload
} from "..//shared/stockitem";
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
import { GetListingForModel } from "../shared/model";
import { GetListingForbusinessPartner } from "../shared/businesspartner";
import { GetListingForStorageLocation } from "../shared/storagelocation";
import { GetListingForcurrency } from "../../resources/shared/currency";
import { GetListingForTaxCode } from "../../financial/shared/vatcode";
import { GetListingForUnit } from "../shared/unit";
import { DropzoneArea } from "material-ui-dropzone";
import { GetModelDataById } from "../shared/model";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import "../../../../../scss/override/select.scss";

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
let AddStockItem = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (!(files === [])) {
      files.map(async e => {
        let formdata = new FormData();
        formdata.append(e.name, e);
        await PostListingForFileUpload(formdata);
      });

      await PostListingForStockItem(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    } else {
      await PostListingForStockItem(values)
        .then(res => props.success())
        .catch(error => props.error());
      props.backmain(1);
      setSubmitting(false);
    }
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      unitId: Yup.string().required("Unit is required"),
      itemCode: Yup.string().required("Item Code is required"),
      modelId: Yup.string().required("Model is required"),
      currencyCode: Yup.string().required("Currency is required"),
      notes: Yup.string().required("Note is required"),
      barCode: Yup.string().required("Bar Code is required"),
      businessPartnerId: Yup.string().required("Supplier is required")
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

  let [model, setModel] = useState([]);
  let [supplier, setSupplier] = useState([]);
  let [storage, setStorage] = useState([]);
  let [unit, setUnit] = useState([]);
  let [currency, setCurrency] = useState([]);
  let [tax, setTax] = useState([]);
  let [files, setFiles] = useState([]);
  let [makeshow, setMakeShow] = useState(true);
  let [productCat, setProductCat] = useState("-");
  let [make, setMake] = useState("-");
  let [datamodel, setdataModel] = useState();

  async function getlistapi() {
    const { data: model } = await GetListingForModel(0, 0);
    setModel(model);

    const { data: supplier } = await GetListingForbusinessPartner(0, 0);
    setSupplier(supplier);

    const { data: storage } = await GetListingForStorageLocation(0, 0);
    setStorage(storage);

    const { data: unit } = await GetListingForUnit(0, 0);
    setUnit(unit);

    const { data: currency } = await GetListingForcurrency(0, 0);
    setCurrency(currency);

    const { data: tax } = await GetListingForTaxCode(0, 0);
    setTax(tax);

    //Multi Select Code

    supplier.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.businessPartnerId;
      if (i === 0) {
        options[0] = obj;
      } else {
        options.push(obj);
      }
    });
  }
  const initialValues = {
    name: "",
    isActive: true
  };

  async function handlemake(event) {
    if (!makeshow) {
      setMakeShow(true);
    }
    const { data: datamodel } = await GetModelDataById(event.target.value);
    setdataModel(datamodel);
    setProductCat(datamodel.productCategoryName);
    setMake(datamodel.makeName);
    setMakeShow(false);
  }

  function handleChangefile(files) {
    setFiles((files = files));
  }

  // function saveChanges(value) {
  //   value.map((e, i) => {
  //     workOKvalue[i] = e.value;
  //   });
  // }

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
                      <div className="row mb-2">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="modelId">Model</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="modelId"
                                id="modelId"
                                // placeholder="i.e. Skip"
                                autoComplete="given-name"
                                valid={!errors.modelId}
                                invalid={touched.modelId && !!errors.modelId}
                                autoFocus={true}
                                required
                                onChange={e => {
                                  handleChange(e);
                                  handlemake(e);
                                }}
                                onBlur={handleBlur}
                                value={values.modelId}
                              >
                                <option selected></option>
                                {model.map(e => (
                                  <option value={e.modelId}>{e.name}</option>
                                ))}
                              </Input>
                              <FormFeedback>{errors.modelId}</FormFeedback>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="businessPartnerId">Supplier</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Select
                                name="businessPartnerId"
                                id="businessPartnerId"
                                options={options}
                                valid={!errors.businessPartnerId}
                                invalid={
                                  touched.businessPartnerId &&
                                  !!errors.businessPartnerId
                                }
                                autoFocus={true}
                                required
                                onChange={e => {
                                  if (!(e === null)) {
                                    values.businessPartnerId = e.value;
                                  } else {
                                    values.businessPartnerId = null;
                                  }
                                  handleBlur();
                                }}
                                onBlur={handleBlur}
                                value={values.businessPartnerId}
                                multi={false}
                              />
                              <p style={classes.validate}>
                                {errors.businessPartnerId
                                  ? "Supplier is Required"
                                  : ""}
                              </p>
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
                              <Label for="name">Item Name</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder=""
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
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="storageLocationId">
                                Storage Location
                              </Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="storageLocationId"
                                id="storageLocationId"
                                // placeholder="i.e. Skip"
                                // autoComplete="given-storageLocationId"
                                // valid={!errors.storageLocationId}
                                // invalid={
                                //   touched.storageLocationId &&
                                //   !!errors.storageLocationId
                                // }
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.storageLocationId}
                              >
                                <option selected></option>
                                {storage.map(e => (
                                  <option value={e.storageLocationId}>
                                    {e.name}
                                  </option>
                                ))}
                              </Input>
                              {/* <FormFeedback>
                                {errors.storageLocationId}
                              </FormFeedback> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="itemCode">Item Code</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="text"
                                name="itemCode"
                                id="itemCode"
                                // placeholder="i.e. Skip"
                                autoComplete="given-name"
                                valid={!errors.itemCode}
                                invalid={touched.itemCode && !!errors.itemCode}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.itemCode}
                              />
                              <FormFeedback>{errors.itemCode}</FormFeedback>
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
                                autoComplete="given-name"
                                valid={!errors.barCode}
                                invalid={touched.barCode && !!errors.barCode}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.barCode}
                              />
                              <FormFeedback>{errors.barCode}</FormFeedback>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                              <Label for="unitPrice">Unit Price</Label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                              <Input
                                type="number"
                                name="unitPrice"
                                id="unitPrice"
                                // placeholder="i.e. Skip"
                                // autoComplete="given-name"
                                // valid={!errors.unitPrice}
                                // invalid={
                                //   touched.unitPrice && !!errors.unitPrice
                                // }
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.unitPrice}
                              />
                              {/* <FormFeedback>{errors.unitPrice}</FormFeedback> */}
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
                                valid={!errors.unitId}
                                invalid={touched.unitId && !!errors.unitId}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.unitId}
                              >
                                <option selected></option>
                                {unit.map(e => (
                                  <option value={e.unitId}>{e.name}</option>
                                ))}
                              </Input>
                              <FormFeedback>{errors.unitId}</FormFeedback>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                              <Label for="costPrice">Cost Price</Label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                              <Input
                                type="number"
                                name="costPrice"
                                id="costPrice"
                                // placeholder="i.e. Skip"
                                // autoComplete="given-name"
                                // valid={!errors.costPrice}
                                // invalid={
                                //   touched.costPrice && !!errors.costPrice
                                // }
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.costPrice}
                              />
                              {/* <FormFeedback>{errors.costPrice}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                              <Label for="currencyCode">Curreny</Label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                              <Input
                                type="select"
                                name="currencyCode"
                                id="currencyCode"
                                // placeholder="i.e. Skip"
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
                                  <option value={e.code}>{e.code}</option>
                                ))}
                              </Input>
                              <FormFeedback>{errors.currencyCode}</FormFeedback>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="isTaxLiable">Taxable</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              &nbsp; &nbsp; &nbsp;{" "}
                              <Input
                                type="checkbox"
                                name="isTaxLiable"
                                id="isTaxLiable"
                                // placeholder="i.e. Skip"
                                // autoComplete="given-name"
                                // valid={!errors.notes}
                                // invalid={touched.notes && !!errors.notes}
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.isTaxLiable}
                              />
                              <Label for="isTaxLiable">Taxable</Label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                              <Label for="taxCodeId">Tax Code</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                              <Input
                                type="select"
                                name="taxCodeId"
                                id="taxCodeId"
                                // placeholder="i.e. Skip"
                                // autoComplete="given-name"
                                // valid={!errors.taxCodeId}
                                // invalid={
                                //   touched.taxCodeId && !!errors.taxCodeId
                                // }
                                // autoFocus={true}
                                // required
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.taxCodeId}
                              >
                                <option selected></option>
                                {tax.map(e => (
                                  <option value={e.taxCodeId}>{e.code}</option>
                                ))}
                              </Input>
                              {/* <FormFeedback>{errors.taxCodeId}</FormFeedback> */}
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
                                autoComplete="given-name"
                                valid={!errors.notes}
                                invalid={touched.notes && !!errors.notes}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.notes}
                              />
                              <FormFeedback>{errors.taxCodeId}</FormFeedback>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <div className="container">
                      <DropzoneArea
                        onChange={handleChangefile}
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        showPreviews={false}
                        maxFileSize={5000000}
                      />
                    </div>
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

export default AddStockItem;
