import React, { Component, useState, useEffect } from "react";
import { PostCrmAssign } from "../shared/marketinglistmap";
import { GetCrmMarketingList } from "../shared/marketinglist";
import { GetCrmMarkCampaign } from "../shared/marketingcampaign";
import MultiSelect from "@khanacademy/react-multi-select";
import "./select.css";
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
import "./add.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none",
    fontWeight: "normal"
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

let options = [];

let AddMarkType = props => {
  let [initialValues, setInitialValues] = useState({
    isActive: true
  });

  let [modelval, setmodelval] = useState([]);

  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (modelval[0] === undefined) {
      errort("Please fill both fields...");
      setSubmitting(false);
    } else {
      modelval.map(async (e, i) => {
        let data = {
          isActive: true,
          marketingCampaignId: values.marketingCampaignId,
          marketingListId: e
        };
        await PostCrmAssign(data)
          .then(res => {
            if (i === modelval.length-1) {
              props.success();
            }
          })
          .catch(error => props.error());
      });
      handleOpen();
    }
  }

  // Toast

  function errort(res) {
    // add type: 'error' to options
    return toast.error(res, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      // name: Yup.string().required("Name is required")
      // marketingListId: Yup.string().required("Marketing List is required"),
      marketingCampaignId: Yup.string().required(
        "Marketing Campaign is required"
      )
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

  let [modal, setModal] = useState(props.open);

  let handleOpen = () => {
    setModal((modal = !modal));
    setTimeout(() => {
      props.backmain(1);
    }, 100);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  let [marklist, setMarklist] = useState([]);
  let [markCamp, setMarkCamp] = useState([]);

  async function getlistapi() {
    const { data: marklist } = await GetCrmMarketingList(0, 0);
    setMarklist(marklist);

    const { data: markCamp } = await GetCrmMarkCampaign(0, 0);
    setMarkCamp(markCamp);

    marklist.map((e, i) => {
      var obj = {};
      obj["label"] = e.name;
      obj["value"] = e.marketingListId;
      if (i === 0) {
        options[0] = obj;
      } else {
        options.push(obj);
      }
    });
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Assign Campaign</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize
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
                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Label
                            for="marketingCampaignId"
                            style={classes.label}
                          >
                            Marketing Campaign
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          <Input
                            type="select"
                            name="marketingCampaignId"
                            id="marketingCampaignId"
                            placeholder=""
                            autoComplete={false}
                            valid={!errors.marketingCampaignId}
                            invalid={
                              touched.marketingCampaignId &&
                              !!errors.marketingCampaignId
                            }
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.marketingCampaignId}
                          >
                            <option selected />
                            {markCamp.map(e => (
                              <option value={e.marketingCampaignId}>
                                {e.name}
                              </option>
                            ))}
                          </Input>
                          <FormFeedback>
                            {errors.marketingCampaignId}
                          </FormFeedback>
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Label
                            for="marketingCampaignId"
                            style={classes.label}
                          >
                            Marketing List
                          </Label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          {/* <Input
                            type="select"
                            name="marketingListId"
                            id="marketingListId"
                            placeholder=""
                            autoComplete={false}
                            valid={!errors.marketingListId}
                            invalid={
                              touched.marketingListId &&
                              !!errors.marketingListId
                            }
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.marketingListId}
                          >
                            <option selected />
                            {marklist.map(e => (
                              <option value={e.marketingListId}>
                                {e.name}
                              </option>
                            ))}
                          </Input> */}
                          <MultiSelect
                            options={options}
                            selected={modelval}
                            onSelectedChanged={e => {
                              setmodelval((modelval = e));
                            }}
                            overrideStrings={{
                              selectSomeItems: "Select List...",
                              allItemsAreSelected: "All Items are Selected",
                              selectAll: "Select All",
                              search: "Search"
                            }}
                          />
                          <FormFeedback>
                            {errors.marketingCampaignId}
                          </FormFeedback>
                        </div>
                      </div>
                    </FormGroup>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8"></div>
                      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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
                            onClick={handleOpen}
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddMarkType;
