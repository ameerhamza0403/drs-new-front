import React, { Component, useState, useEffect } from "react";
import {
  PostListingForjobgrouptemplate,
  PostListingFortemplategroup
} from "..//shared/jobgrouptemplate";
import {
  Button,
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
import TextField from "@material-ui/core/TextField";
// import {GetListingForAddEdit} from '../../resources/shared/addedit';
import GroupTemplate from "./templatejobs/listing";

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
  divider: {
    height: "1px",
    backgroundColor: "#CED4DA",
    width: "99%",
    marginLeft: "1px"
  },
  h2: {
    color: "#EE7647"
  }
};


let data = [];

let JobGroupTemplateAdd = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  function handletemplatedata(value) {
    data = value;
    console.log(data)
  }

  let [newvalue, setNewvalue] = useState([
    {
      jobGroupTemplateId: 0,
      contact: "",
      jobTypeId: 0,
      resourceId: 0
    }
  ]);
  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (data.length === 0) {
      errorc();
      setSubmitting(true);
      setSubmitting(false);
    } else {
      let newdata=[{}];
      data.map((e,i)=>{
        newdata[i].contact=e.namecon
        newdata[i].jobTypeId=parseInt(e.name,10)
        newdata[i].resourceId=parseInt(e.namres,10)
      })
      let idtemp;
      await PostListingForjobgrouptemplate(values)
        .then(res => {
          success();
          idtemp = res.data.jobGroupTemplateId;
          newdata.map(async e => {
            // delete e.count;
            e.jobGroupTemplateId = idtemp;
            await PostListingFortemplategroup(idtemp, e)
              .then(() => success())
              .catch(error => errort());
          });
        })
        .catch(error => errort());

      handleOpen();
      props.refresh();
      setSubmitting(false);
    }
  }

  //Tost

  function errorc() {
    // add type: 'error' to options
    return toast.error("Please Add Group Template..", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

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
      name: Yup.string()
        .min(4, `Name has to be at least 4 characters`)
        .required("Name is required")
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

  let initialValues={
    name: "",
    sameContact: false,
    sameResource: false,
    isActive: true
  };

  function HandleContact(event){
    return(
      initialValues.sameContact=event.target.value
      )
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

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="lg"
      >
        <ModalHeader toggle={handleOpen}>Job Group Template</ModalHeader>
        <ModalBody>
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
                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Job Group Template</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              // placeholder="i.e. Company Car"
                              autoComplete="given-name"
                              className="form-control"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <FormFeedback>
                              {errors.name}
                              {/* {"Name is Required"} */}
                            </FormFeedback>

                            {/* <input
                              id="name"
                              placeholder="Enter your email"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                            )} */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="sameContact"
                              id="sameContact"
                              valid={!errors.sameContact}
                              invalid={
                                touched.sameContact && !!errors.sameContact
                              }
                              onClick={HandleContact}
                              onBlur={handleBlur}
                              value={values.sameContact}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              All jobs within the group are at the same contact
                              as the group's contact
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <input
                              name="sameResource"
                              id="sameResource"
                              valid={!errors.sameResource}
                              invalid={
                                touched.sameResource && !!errors.sameResource
                              }
                              onClick={handleChange}
                              onBlur={handleBlur}
                              value={values.sameResource}
                              type="checkbox"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <label
                              className="form-check-label"
                              for="defaultCheck2"
                            >
                              All jobs within the group are scheduled to the
                              same staff
                            </label>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>
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
                              for="defaultCheck3"
                            >
                              isActive
                            </label>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="row" style={classes.divider}></div>
                        <br />
                        <div className="row mb-2">
                          <div className="container">
                            <h2 style={classes.h2}>Template jobs</h2>
                            <GroupTemplate templatedata={handletemplatedata}/>
                          </div>
                        </div>

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

export default JobGroupTemplateAdd;
