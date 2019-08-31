import { GetManageMakesnModelDataById, PutManageMakesnModelDataById } from "..//shared/managemakesnmodel";
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
import { GetListingForProductCategory } from "../shared/productcategory";
import { GetListingForNominalCode } from "../../financial/shared/nominalcode";
import { GetListingForDepartmentCode } from "../../financial/shared/departmentcode";
import { GetListingForWorkSheet } from "../../schedule/shared/worksheet";




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

let EditManageMakesnModel = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

//Toast

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

    const [editvalues, seteditvalues] = useState({
    
        active: false
    });
    

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

    const { data: editvalues } = await GetManageMakesnModelDataById(props.IDforAPI);
    console.log(editvalues);
    seteditvalues(editvalues)
    
    }



  async function onSubmit(values, { setSubmitting, setErrors }) {
    Object.keys(editvalues).map(function(keyName, keyIndex) {
      if(!values.hasOwnProperty(keyName)){
        // values.keyName=editValue.keyName;
        values[keyName]=editvalues[keyName]
      }
    })
    await PutManageMakesnModelDataById(props.IDforAPI, values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Category has to be at least 4 characters`)
    .required("Category Code is requierd"),

        
        

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
    return (
      setModal((modal = false)),
      setTimeout(()=> props.cross(), 200)

    );
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">ProductCategory</h3></ModalHeader>
        <ModalBody style={{'max-height': 'calc(100vh - 150px)', 'overflow-y': 'auto'}}>
          <div className="container">
            <Formik
              editvalues={editvalues}
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
                            <Label for="name">Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="group"
                              id="group"
                              placeholder={editvalues.group}
                              autoComplete="given-name"
                              valid={!errors.group}
                              invalid={touched.group && !!errors.group}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.group}
                              defaultValue={ editvalues.group}
                            />
                            <FormFeedback>{errors.group}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Category</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder={editvalues.name}
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

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultVAT">defaultVAT</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <input
                             
                             
                              type="text"
                              name="defaultVAT"
                              id="defaultVAT"
                              placeholder="e.g. Taxi, train, Fuel etc..."
                              
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={editvalues.defaultVAT}
                              className={
                                errors.name && touched.name
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.name && touched.name && (
                              <FormFeedback>
                              {errors.name}
                            </FormFeedback>
                            )}
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultCost">Default Cost</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <input
                              type="text"
                              name="defaultCost"
                              id="defaultCost"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={editvalues.defaultCost}
                              //value={values.defaultCost}
                              className={
                                errors.defaultCost && touched.defaultCost
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.defaultCost && touched.defaultCost && (
                              <FormFeedback>
                              {errors.defaultCost}
                            </FormFeedback>
                            )}
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="amountChangeable"></Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            
                            <input
                              name="amountChangeable"
                              id="amountChangeable"
                              valid={!errors.amountChangeable}
                              invalid={touched.amountChangeable && !!errors.amountChangeable}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={editvalues.amountChangeable}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              amount can be changed
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="isFuel">is Fuel</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            
                            <input
                              name="isFuel"
                              id="isFuel"
                              valid={!errors.isFuel}
                              invalid={touched.isFuel && !!errors.isFuel}
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={editvalues.isFuel}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              If selected, the resource will be prompted to enter isFuel quantity as well as cost
                            </label>
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
                              value={editvalues.active}
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

export default EditManageMakesnModel;
