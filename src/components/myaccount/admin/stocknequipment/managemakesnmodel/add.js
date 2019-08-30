import React, { Component, useState, useEffect } from "react";
import {  PostListingForManageMakesnModel } from "../shared/managemakesnmodel";
import { GetListingForProductCategory } from "../shared/productcategory";
import { GetListingForNominalCode } from "../../financial/shared/nominalcode";
import { GetListingForDepartmentCode } from "../../financial/shared/departmentcode";
import { GetListingForWorkSheet } from "../../schedule/shared/worksheet";

import Select from 'react-select';
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


const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
  plusbutton: {
    color: "white",
    borderRadius: "50px",
    width: '10px',
    cursor: 'pointer',
    float: 'left',
    // marginTop: '10px',
    // marginLeft: '5px',
  },

};

let AddManageMakesnModel = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

      //Tost

      function errort() {
        // add type: 'error' to options
        return toast.error('Failed with Error...', {
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
        },
      ]);

      let [nCode, setNCode] = useState([
        {
          nominalCodeId: 0,
          code: ""
        },
      ]);

      let [dCode, setDCode] = useState([
        {
          departmentCodeId: 0,
          code: ""
        },
      ]);

      let [worksheet, setWorksheet] = useState([
        {
          worksheetId: 0,
          name: ""
        },
      ]);
      
    
      useEffect(() => {
        getinitiallist();
      }, []);
    
      async function getinitiallist() {
        const {data:pCategory} = await GetListingForProductCategory(0,0);
        setPCategory(pCategory);

        const {data:nCode} = await GetListingForNominalCode(0,0);
        setNCode(nCode);

        const {data:dCode} = await GetListingForDepartmentCode(0,0);
        setDCode(dCode);

        const {data:worksheet} = await GetListingForWorkSheet(0,0);
        setWorksheet(worksheet);
        
      }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values);
    values.date = initialValues.date;
    await PostListingForManageMakesnModel(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Category has to be at least 4 characters`)
    .required("Category is requierd"),
        

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
    productCategory: "",
    nominalCode:"",
    departmentCode:"",
    make:"",
    model :"",
    modelNumber:"",
    consumable:"",
    size:"",
    weight:"",
    worksheetId:"",
    bachNumber:"",
    stockCode:"",
    sellingPrice:"",
    vatCode:"",
    pricelanguage:"",
    notes:"",
    attachments:"",
    date:"",
    active: false
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


  const Handlechange  = name => event => {
    
    
    setInitialValues( ...initialValues, [name] = event.target.value);

  };

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">ManageMakesnModel</h3></ModalHeader>
        <ModalBody style={{'max-height': 'calc(100vh - 150px)', 'overflow-y': 'auto'}}>
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
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="group">Product Category</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="productCategory"
                              id="productCategory"
                              placeholder="e.g. Accommodation, Travel etc..."
                              autoComplete="given-name"
                              valid={!errors.productCategory}
                              invalid={touched.productCategory && !!errors.productCategory}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.productCategory}
                            >
                            <option selected></option>
                            {pCategory.map(e => (
                                <option value={e.productCategoryId}>{e.name}</option>
                            ))}
                            </Input>
                            <FormFeedback>{errors.productCategory}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="nominalCode">Nominal Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                            <Input
                              type="select"
                              name="nominalCode"
                              id="nominalCode"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.nominalCode}
                              invalid={touched.nominalCode && !!errors.nominalCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.nominalCode}
                              >
                              <option selected></option>
                              {nCode.map(e => (
                                  <option value={e.nominalCodeId}>{e.code}</option>
                              ))}
                              </Input>
                            <FormFeedback>{errors.nominalCode}</FormFeedback>
                           
                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="departmentCode">Department Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                            <Input
                              type="select"
                              name="departmentCode"
                              id="departmentCode"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.departmentCode}
                              invalid={touched.departmentCode && !!errors.departmentCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.departmentCode}
                              >
                              <option selected></option>
                              {dCode.map(e => (
                                  <option value={e.departmentCodeId}>{e.code}</option>
                              ))}
                              </Input>
                            <FormFeedback>{errors.departmentCode}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="make">Make</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="make"
                              id="make"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              autoComplete="given-name"
                              valid={!errors.make}
                              invalid={touched.make && !!errors.make}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.make}
                            />
                            <FormFeedback>{errors.make}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="model">Model</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="model"
                              id="model"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              autoComplete="given-name"
                              valid={!errors.model}
                              invalid={touched.model && !!errors.model}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.model}
                            />
                            <FormFeedback>{errors.model}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="modelNumber">Model Number</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="modelNumber"
                              id="modelNumber"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              autoComplete="given-name"
                              valid={!errors.modelNumber}
                              invalid={touched.modelNumber && !!errors.modelNumber}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.modelNumber}
                            />
                            <FormFeedback>{errors.modelNumber}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="consumeable">Consumeable</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            
                            <input
                              name="consumeable"
                              id="consumeable"
                              valid={!errors.consumeable}
                              invalid={touched.consumeable && !!errors.consumeable}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.consumeable}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              consumable
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="worksheetok">Worksheet to fill if movement OK</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="worksheetok"
                              id="worksheetok"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.worksheetok}
                              invalid={touched.worksheetok && !!errors.worksheetok}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.worksheetok}
                            >
                            <option selected></option>
                            {worksheet.map(e => (
                                <option value={e.worksheetId}>{e.name}</option>
                            ))}
                            </Input>
                            <FormFeedback>{errors.worksheetok}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="worksheetnotok">Worksheet to fill if movement Not OK</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="worksheetnotok"
                              id="worksheetnotok"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.worksheetnotok}
                              invalid={touched.worksheetnotok && !!errors.worksheetnotok}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.worksheetnotok}
                            >
                            <option selected></option>
                            {worksheet.map(e => (
                                <option value={e.worksheetId}>{e.name}</option>
                            ))}
                            </Input>
                            <FormFeedback>{errors.worksheetnotok}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="bachNumber">Bach Number</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="bachNumber"
                              id="bachNumber"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.bachNumber}
                              invalid={touched.bachNumber && !!errors.bachNumber}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.bachNumber}
                            />
                            <FormFeedback>{errors.bachNumber}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="stockCode">Stock Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="stockCode"
                              id="stockCode"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.stockCode}
                              invalid={touched.stockCode && !!errors.stockCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.stockCode}
                            />
                            <FormFeedback>{errors.stockCode}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sellingPrice">Stock Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 mb-3">
                            <Input
                              type="text"
                              name="sellingPrice"
                              id="sellingPrice"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.sellingPrice}
                              invalid={touched.sellingPrice && !!errors.sellingPrice}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.sellingPrice}
                            />
                            <FormFeedback>{errors.sellingPrice}</FormFeedback>
                           
                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 mb-3">
                            <Input
                              type="select"
                              name="currency"
                              id="currency"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.currency}
                              invalid={touched.currency && !!errors.currency}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                            </Input>
                          </div>

                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="vatCode">VAT Code</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                            <Input
                              type="select"
                              name="vatCode"
                              id="vatCode"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.vatCode}
                              invalid={touched.vatCode && !!errors.vatCode}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="notes">Notes</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                            <Input
                              type="textarea"
                              name="notes"
                              id="notes"
                              placeholder=" "
                              autoComplete="given-name"
                              valid={!errors.notes}
                              invalid={
                                touched.notes && !!errors.notes
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.notes}
                            />
                           </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="siteLocaTION">Site Location</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                            <Input
                              type="text"
                              name="siteLocaTION"
                              id="siteLocaTION"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              autoComplete="given-name"
                              valid={!errors.siteLocaTION}
                              invalid={touched.siteLocaTION && !!errors.siteLocaTION}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.siteLocaTION}
                            />
                            {/* <FormFeedback>{errors.siteLocaTION}</FormFeedback> */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="expiryDate">Warranty Expiry</Label>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                                <TextField
                                    id="date"
                                    
                                    type="date"
                                    defaultValue="2019-05-24"
                                    onChange={Handlechange}
                                    InputLabelProps={{
                                    shrink: true
                                    }}
                                    
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
                              placeholder="i.e. "
                              autoComplete="given-name"
                              // valid={!errors.reference}
                              // invalid={touched.reference && !!errors.reference}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.attachments}
                            />
                           
                            <FormFeedback>{errors.reference}</FormFeedback>
                          </div>
                        </div>

                        
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="sharing"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            
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
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddManageMakesnModel;
