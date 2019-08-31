import React, { Component, useState, useEffect } from "react";
import {  PostListingForUser } from "../shared/user";
import { GetListingForRole } from "../shared/role"
import { GetListingForJobcategory } from "../../schedule/shared/jobcategory";

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

let AddUser = props => {
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

      let [roles, setRoles] = useState([
        {
          roleId: 0,
          name: ""
        },
      ]);

      let [jobcategory, setJobcategory] = useState([
        {
          jobCategoryId: 0,
          name: ""
        },
      ]);
      
    
      useEffect(() => {
        getinitiallist();
      }, []);
    
      async function getinitiallist() {
        const {data:roles} = await GetListingForRole(0,0);
        setRoles(roles);

        const {data:jobcategory} = await GetListingForJobcategory(0,0);
        setJobcategory(jobcategory);
      }


  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values);
    await PostListingForUser(values).then(()=>success()).catch(error=>errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  Yup.addMethod(Yup.mixed, 'equalTo', function(ref, message) {
    const msg = message || '${path} should match ${ref.path}';
    return this.test('equalTo', msg, function (value) {
      let refValue = this.resolve(ref);
      return !refValue || !value || value === refValue;
    })
})

  
  const validationSchema = function(values) {
    return Yup.object().shape({
    name: Yup.string()
    .min(4, `Name has to be at least 4 characters`)
    .required("Name is requierd"),

    email: Yup.string()
    .email('Invalid email')
    .required('Required'),

    password: Yup.string()
    .min(6,'Password should be at least 6 characters')
    .required('Required'),

    passwordconfirmation: Yup.string().
    equalTo(Yup.ref('password'), 'Passwords must match').required('Required'),
        
    role: Yup.string()
    .required("Role is requierd"),

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

  const initialValues = {
    name: "",
    email:"",
    password:"",
    passwordconfirmation:"",
    role:"",
    group:"",
    mobile:"",
    position:"",
    ipRestrection:"",
    defaultJobCat:"",
    active: false
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
        <ModalHeader toggle={handleOpen} ><h3 className="font-weight:bold;">User</h3></ModalHeader>
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
                            <Label for="name">Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
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

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="email">Email</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="email"
                              name="email"
                              id="email"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.email}
                              invalid={touched.email && !!errors.email}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <FormFeedback>{errors.email}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="password">Password</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="password"
                              name="password"
                              id="password"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.password}
                              invalid={touched.password && !!errors.password}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <FormFeedback>{errors.password}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="passwordconfirmation">Password Confirmation</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="password"
                              name="passwordconfirmation"
                              id="passwordconfirmation"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.passwordconfirmation}
                              invalid={touched.passwordconfirmation && !!errors.passwordconfirmation}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.passwordconfirmation}
                            />
                            <FormFeedback>{errors.passwordconfirmation}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="role">Role</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="role"
                              id="role"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.role}
                              invalid={touched.role && !!errors.role}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.role}
                            >
                            <option selected></option>
                            {roles.map(e => (
                                <option value={e.roleId}>{e.name}</option>
                            ))}
                            </Input>
                            <FormFeedback>{errors.productCategory}</FormFeedback>
                           
                          </div>
                        </div>


                        {/* <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="group">Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="group"
                              id="group"

                              autoComplete="given-name"
                              valid={!errors.group}
                              invalid={touched.group && !!errors.group}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.group}

                            >
                               <option value="">N/A</option>
                               
                               
                            </Input>
                            <FormFeedback>{errors.group}</FormFeedback>

                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="mobile">Mobile Phone</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="mobile"
                              id="mobile"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.mobile}
                              invalid={touched.mobile && !!errors.mobile}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.mobile}
                            />
                            <FormFeedback>{errors.mobile}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="position">Position</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="position"
                              id="position"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.position}
                              invalid={touched.position && !!errors.position}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.position}
                            />
                            <FormFeedback>{errors.position}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="ipRestrection">IP Restrection</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="text"
                              name="ipRestrection"
                              id="ipRestrection"
                              placeholder="Limit the user to connect from a defined IP address"
                              autoComplete="given-name"
                              valid={!errors.ipRestrection}
                              invalid={touched.ipRestrection && !!errors.ipRestrection}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ipRestrection}
                            />
                            <FormFeedback>{errors.ipRestrection}</FormFeedback>
                           
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="defaultJobCat">Default Job Category</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-9 col-xl-9 mb-3">
                            <Input
                              type="select"
                              name="defaultJobCat"
                              id="defaultJobCat"
                              placeholder=""
                              autoComplete="given-name"
                              valid={!errors.defaultJobCat}
                              invalid={touched.defaultJobCat && !!errors.defaultJobCat}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.defaultJobCat}
                            >
                            <option selected></option>
                            {jobcategory.map(e => (
                                <option value={e.jobCategoryId}>{e.name}</option>
                            ))}
                            </Input>
                            <FormFeedback>{errors.defaultJobCat}</FormFeedback>
                           
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

export default AddUser;
