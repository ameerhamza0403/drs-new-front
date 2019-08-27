import {
  GetFinancialDocumentnSaleDataById,
  PutFinancialDocumentnSaleDataById
} from "../..//shared/docnsale";
import React, { useEffect, useState } from "react";
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

let AddNote = (props) => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Toast

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

  async function onSubmit(values, { setSubmitting, setErrors }) {

    values.nextNumber=parseInt(initialValues.nextNumber);
    values.documentTypeId=parseInt(props.id);
    values.name=initialValues.name;
    values.referencePrefix=initialValues.referencePrefix;
    values.referenceFormat=initialValues.referenceFormat;
    values.active=true;
    await PutFinancialDocumentnSaleDataById(props.id, values)
      .then(() => success())
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      notes: Yup.string()
        .min(3, `Note has to be at least 3 characters`)
        .required("Note is required")
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
    // nextNumber: 0,
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
  let [modalA, setModalA] = useState(false);

  let handleOpen = () => {
    return setModalA((modalA = !modalA)), setTimeout(() => props.cross(), 200);
  };
  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: initialValues } = await GetFinancialDocumentnSaleDataById(
      props.id
    );
    setInitialValues(initialValues);
  }

  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div>
      <Modal
        isOpen={modalA}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Notes to Client</ModalHeader>
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

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Label</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="label"
                              id="label"
                              placeholder={initialValues.label}
                              autoComplete="given-name"
                              // valid={!errors.label}
                              // invalid={touched.label && !!errors.label}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.label}
                            />
                            {/* <FormFeedback>{errors.label}</FormFeedback> */}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">Notes</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="textarea"
                              name="notes"
                              id="notes"
                              placeholder={initialValues.notes}
                              autoComplete="given-name"
                              // valid={!errors.notes}
                              // invalid={touched.notes && !!errors.notes}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.notes}
                            />
                            {/* <FormFeedback>{errors.notes}</FormFeedback> */}
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
                            {isSubmitting ? "Wait..." : "Update"}
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

export default AddNote;
