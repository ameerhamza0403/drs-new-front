import { GetAccountDataById, PutAccountDataById } from "../../shared/accounts";
import { GetListingForAccountSetting } from '../../shared/accountsetting'
import React, { Component, useState, useEffect } from "react";
import AddAccountSetting from '../../accountsetting/add'
import * as _ from 'lodash';
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


let formfull = "";
let settingForm= "";
let menuDiv = "";
let EditshowModel = "";
let selectedFile = [];
let nameoffile = "";
let settingsarray =[];


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
  moduleName:{
    color: "#EE7647",
  },
  input:{
    width:"60px",
  }
  

};


let EditAccount = props => {
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



  async function onSubmit(editValues, { setSubmitting, setErrors }) {
    await PutAccountDataById(props.IDforAPI, editValues).then(()=>success()).catch(error=>errort());
    //handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Name has to be at least 4 characters`)
    .required("Name is requierd"),

    addressLine1: Yup.string()
    .required("Address Line 1 is requierd"),
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
  let [filen, setFilen] = useState(false);
  let handleFileSelect = event => {
    setFilen(false);
    initialValues.logo = "";
    return (selectedFile=event.target.files[0]), setFilen(true);
  };

  if (filen) {
    nameoffile = nameoffile;
  } else {
    nameoffile = "";
  }

  let [showform, setShowForm] = useState(false);

//   let handleOpen = () => {
//     return (
//       setModal((modal = !modal)),
//       setTimeout(()=> props.cross(), 200)

//     );
//   };


  useEffect(() => {
    getlistapi();
  }, []);
  let [settingsarraystate, setSettingsarray ] =useState();

  let [initialValues, setInitialValues] = useState({
    
  });
  let [accountsettingdata, setaccountsettingdata] = useState();
  let [menushow, setMenushow] = useState(false);
  async function getlistapi() {
    const { data: initialValues } = await GetAccountDataById();
    setInitialValues(initialValues)
    //setShowForm(true);
    
    const { data: accountsettingdata } = await GetListingForAccountSetting();
    setaccountsettingdata(accountsettingdata)
    console.log(accountsettingdata);
    accountsettingdata.map((e,i) =>{
      let name = e.module;
      //console.log(settingsarray[name] , e.module)
     if(settingsarray[name] !== undefined && settingsarray[name][0].module === e.module ){
       
      settingsarray[name].push(e)
      console.log("1")
     } 
     else
     {
       settingsarray[name] = [];
       settingsarray[name].push(e);
       settingsarraystate = settingsarray;
       console.log("2")
     }
  
    })
    setSettingsarray(settingsarray);
    ;
    console.log(settingsarray)
    console.log(settingsarraystate)

    setShowForm(true);
  }

   let handleKeyDown= name =>event=> {
      event.preventDefault();
      
      setInitialValues({...initialValues, [name]:event.target.value})
      console.log(initialValues);

      PutAccountDataById(initialValues).then(()=>success()).catch(error=>errort());

    
  }

    if(showform){
        formfull = (
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
                    <Label for="name">Your Company Name</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        //placeholder="Enter Your Company Name"
                        // valid={!errors.name}
                        // invalid={touched.name && !!errors.name}
                        // autoFocus={true}
                        // required
                        onBlur={handleKeyDown('name')}
                        onChange={handleChange}
                        //onBlur={handleBlur}
                        
                        value={values.name}
                    />
                    {/* <FormFeedback>{errors.code}</FormFeedback> */}
                    
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="addressLine1">Address Line 1</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    <Input
                        id="addressLine1"
                        //placeholder="Enter your Address Line 1"
                        type="text"
                        name="addressLine1"
                        //autoComplete="given-name"
                        // valid={!errors.addressLine1}
                        // invalid={touched.addressLine1 && !!errors.addressLine1}
                        // autoFocus={true}
                        // required
                        onBlur={handleKeyDown('addressLine1')}
                        onChange={handleChange}

                        //onBlur={handleBlur}
                        value={values.addressLine1}
                        
                    />
                    
                    {/* <FormFeedback>{errors.addressLine1}</FormFeedback> */}
                    
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="addressLine2">Address Line 2</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    <Input
                        id="addressLine2"
                        //placeholder="Enter your Address Line 3"
                        type="text"
                        //autoComplete="given-name"
                        // valid={!errors.addressLine3}
                        // invalid={touched.addressLine3 && !!errors.addressLine3}
                        // autoFocus={true}
                        // required
                        onBlur={handleKeyDown('addressLine2')}
                        onChange={handleChange}
                        //onBlur={handleBlur}
                        name="addressLine2"
                        value={values.addressLine2}
                    />
                    <FormFeedback>{errors.addressLine2}</FormFeedback>
                    
                    
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="addressLine3">Address Line 3</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    <Input
                        id="addressLine3"
                        //placeholder="Enter your Address Line 3"
                        type="text"
                        //autoComplete="given-name"
                        // valid={!errors.addressLine3}
                        // invalid={touched.addressLine3 && !!errors.addressLine3}
                        // autoFocus={true}
                        // required
                        onBlur={handleKeyDown('addressLine3')}
                        onChange={handleChange}
                        //onBlur={handleBlur}
                        name="addressLine3"
                        value={values.addressLine3}
                    />
                    <FormFeedback>{errors.addressLine3}</FormFeedback>
                    
                    
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="jobFooterText ">Default text for the job card footer</Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    <Input
                        id="jobFooterText "
                        //placeholder="Enter your Footer Text"
                        type="text"
                        // autoComplete="given-name"
                        // valid={!errors.jobFooterText}
                        // invalid={touched.jobFooterText && !!errors.jobFooterText}
                        // autoFocus={true}
                        // required
                        onBlur={handleKeyDown('jobFooterText')}
                        value={values.jobFooterText }
                        onChange={handleChange}
                        //onBlur={handleBlur}
                        name="jobFooterText"
                        
                        
                    />
                    {/* <FormFeedback>{errors.jobFooterText}</FormFeedback> */}
                    
                    
                    </div>
                </div>
        
                <div className="row mb-2">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    Url of your logo
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9">
                    <input
                        type="file"
                        name="logo"
                        id="name"
                        // placeholder="i.e. "
                        autoComplete="given-name"
                        // valid={!errors.reference}
                        // invalid={touched.reference && !!errors.reference}
                        // autoFocus={true}
                        // required
                        onChange={handleFileSelect}
                        // onBlur={handleBlur}
                        // value={values.reference}
                        //value={values.logo}
                    />
                    {initialValues.logo}
                    
                    {/* <FormFeedback>{errors.logo}</FormFeedback> */}
                    </div>
                </div>
        
            
                
                {/* <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <Label for="isActive"></Label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                    
                    <input
                        name="isActive"
                        id="isActive"
                        valid={!errors.isActive}
                        invalid={touched.isActive && !!errors.isActive}
                        onClick={handleChange}
                        onBlur={handleBlur}
                        value={values.isActive}
                        defaultChecked={initialValues.isActive}
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
                </div> */}
                
                
                </FormGroup>
                </Form>
                </Col>
            </Row>
            )}
        />
         ); 
        
         settingForm = (
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
              {/* <h2>Jobs on device</h2> */}
              {Object.keys(settingsarray).map(function(keyName, keyIndex) {
                return <div className="container mb-5">{
                (settingsarray[keyName].map((e,i) => (
               (i===0)?
               <div className="row mb-3 ml-1" style={classes.moduleName}>
                 <h3 className="">
                    {e.module}
                  </h3>
                </div>:
               
                  <div className="row mb-1">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                    <Label for="name">{e.name}</Label>
                    </div>
                    
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    {(e.type === "Yes/No")?
                      <div >
                      &nbsp;<input type="radio"
                        name={`radio${keyIndex}${i}`}
                        id={`radio${keyIndex}${i}`}
                        value="Yes/No"
                        defaultChecked={(e.value==="Yes")?true:false}
                        onChange={handleChange}/>&nbsp;<label for={`radio${keyIndex}${i}`}>Yes</label>
                      &nbsp;<input type="radio"
                        name={`radio${keyIndex}${i}`}
                        id={`radio${keyIndex}${i}`}
                        value="Yes/No"
                        defaultChecked={(e.value==="No")?true:false}
                        onChange={handleChange}/>&nbsp;<label for={`radio${keyIndex}${i}`}>No</label>

                    </div>: (e.type==="text")?
                    <Input 
                      style={classes.input}
                      type="text"
                      name="type"
                      id="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={e.value}
                      //value={e.type}
                    />:(e.type==="select")?
                      <Input
                          type="select"
                          name="defaultJobCard"
                          id="defaultJobCard"
                          onChange={handleChange}
                          //onBlur={handleBlur}
                          defaultChecked={e.type}
                        ><option>{e.type}</option></Input>:""
                    }
                    
                    </div>
                    
                  </div>
                  
                )))}
                <hr />
                </div>
                  
               
              })}
          
              
              </FormGroup>
              </Form>
              </Col>
          </Row>
          )}
      />
       ); 
    } 
    else if(showform===false){
        formfull = "";
    }

    function addsetting() {
       return <AddAccountSetting />
    }

    if (menushow) {
        menuDiv = (
          <ul className="tool">
            <li>
              <AddAccountSetting  />
            </li>
            {/* <li onClick={HandleEditforlisting}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fa fa-pencil-square fa-2x" />
            </li>
            <li onClick={Dellistapi}>
              &nbsp;&nbsp;
              <i className="fa fa-archive fa-2x" />
            </li>
            <li onClick={Handlerowclose}>
              &nbsp;&nbsp;
              <i className="fa fa-times-rectangle fa-2x" />
            </li> */}
          </ul>
        );
      } else if (!menushow) {
        menuDiv = (
          <ul className="tool">
            <li />
            <AddAccountSetting  />
          </ul>
        );
      }
    
      return (
        <div>
        {formfull} 
          <div className="row header">
            <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-5">
            {menuDiv}
            </div>
            <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
              <h3 className="heading">ACCOUNT SETTING</h3>
            </div>
          </div>
          <br />
           
          {settingForm}
      </div>
                    
  );
};

export default EditAccount;
