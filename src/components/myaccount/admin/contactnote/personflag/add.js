import React, { Component, useState } from "react";
import { PostListingForPersonflag } from "..//shared/personflag";
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


let valofCod;
let AddPersonFlag = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Tost

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

  let ColorCode = [
    "FFFFE0",
    "FFFACD",
    "FFEFD5",
    "FFDAB9",
    "FFE4B5",
    "DDA0DD",
    "EEE8AA",
    "F0E68C",
    "FF7F50",
    "FF6347",
    "FF8C00",
    "FFA500",
    "FFD700",
    "663399",
    "FFF8DC",
    "FFE4C4",
    "00FF00",
    "F5DEB3",
    "DEB887",
    "D2B48C",
    "F4A460",
    "CD853F",
    "A0522D",
    "800000",
    "999999",
    "7FFF00",
    "00FF00",
    "98FB98",
    "00FA9A",
    "2E8B57",
    "008B8B",
    "0000CD",
    "00FFFF",
    "00BFFF",
    "ADD8E6",
    "708090",
    "000000"
  ];
  let ColorStyle = {};

  let ColorStyleFn = mycolor => {
    let code = "#" + mycolor;
    return (ColorStyle = {
      background: code
    });
  };

  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values)
    await PostListingForPersonflag(values)
      .then(res => success(res.data.message))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        .min(4, `Currency name has to be at least 4 characters`)
        .required("Name is required"),
      code: Yup.string()
        .max(3, `Currency Code has to be at least 3 characters`)
        .required("Code is required")
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
    colorCode: "",
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

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

  let showSlccode = (
    <div className="ColorCodesl" style={ColorStyleFn("000000")} />
  );
  let [codeswitch, setCodeswitch] = React.useState("false");
  let SelectColor = event => {
    let namer = "colorCode";
    valofCod = event.target.getAttribute("value");
    setInitialValues({ ...initialValues, [namer]: valofCod });
    setCodeswitch({ codeswitch: true });
  };
  if (codeswitch) {
    showSlccode = (
      <div className="ColorCodesl" style={ColorStyleFn(valofCod)} />
    );
  } else {
    showSlccode = (
      <div className="ColorCodesl" style={ColorStyleFn("000000")} />
    );
  }

  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Add Currency</ModalHeader>
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
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Flag Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="i.e. Person"
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
                            <br />
                            <br />
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
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Color</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <div className="row">
                              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                              {showSlccode}
                            </div>
                            <div className="row">
                              {ColorCode.map(e => (
                                <div
                                  className="ColorCodes"
                                  style={ColorStyleFn(e)}
                                  value={e}
                                  onClick={SelectColor}
                                />
                              ))}
                            </div>
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

export default AddPersonFlag;
