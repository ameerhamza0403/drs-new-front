import { PostListingForFileLibrary, PostListingForFileUpload } from "../shared/filelibrary";
import {PostListingForResourceGroup} from '../shared/resourcegroup';
import { GetAllListingForFileGroup } from "../shared/filegroup";
import { GetListingForResourceGroup } from "../../resources/shared/resourcegroup";
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
let selectedFile = [];
let nameoffile = "";
let resourcearr=[];
let resarr=[];
let FileLibraryAdd = props => {

  let [valueforResgroup, setValueForResGroup]=useState([]);
  // getModalStyle is not a pure function, we roll the style only on the first render
  async function onSubmit(values, { setSubmitting, setErrors }) {
    if (values.name === "") {
      values.name = nameoffile;
    }
    let formdata = new FormData();
    formdata.append(values.name,selectedFile);

    console.log(values)
    await PostListingForFileUpload(formdata);
    await PostListingForFileLibrary(values)
      .then((res)=>

        resarr.map(async (e)=>{
          // let name='fileLibraryId';
          // let namer='resourceGroupId';
          // setValueForResGroup({
          //   ...valueforResgroup,[name]:res.data.fileLibraryId,
          //   [namer]:parseInt(e,10)
          // })
          // valueforResgroup.fileLibraryId=res.data.fileLibraryId;
          // valueforResgroup.resourceGroupId=parseInt(e,10);
        await PostListingForResourceGroup({'fileLibraryId':res.data.fileLibraryId,'resourceGroupId':parseInt(e,10), 'isActive':true});
      }))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

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

  const validationSchema = function(values) {
    return Yup.object().shape({});
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
    // fileLibraryId: 0,
    fileGroupId: 0,
    createdOn: "",
    name: "",
    isActive: true
  };

  useEffect(() => {
    getGroupList();
    getReslist();
  }, []);

  let [filegroup, setFileGroup] = useState([]);
  async function getGroupList() {
    const { data: filegroup } = await GetAllListingForFileGroup();
    setFileGroup(filegroup);
  }

  let [resource, setResource] = useState([{
    resourceGroupName:'',
    // resourceGroupId:0,
  }]);

  let [res,setRes]=useState(false);
  async function getReslist() {
    const { data: resource } = await GetListingForResourceGroup();
    setResource(resource);
    setRes(true);
  }

  let handleresource=event=>{
    if(resarr.length===0){
      resarr[0]=event.target.value;
    }
    else{
      resarr.push(event.target.value)
    }
  }

  if(res){
    resourcearr=(resource.map(e =>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
        <input
          name={e.resourceGroupId}
          id={e.resourceGroupId}
          // valid={!errors.resourceGroupId}
          // invalid={
          //   touched.resourceGroupId &&
          //   !!errors.resourceGroupId
          // }
          onClick={handleresource}
          // onBlur={handleBlur}
          value={e.resourceGroupId}
          type="checkbox"
        />
        <label
          className="form-check-label"
          for="defaultCheck1"
        >
          {e.name}
        </label>
      </div>
    ));
  }
  else{
    resourcearr=[];
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

  let [filen, setFilen] = useState(false);
  let handleFileSelect = event => {
    setFilen(false);
    return (selectedFile=event.target.files[0]), setFilen(true);
  };

  if (filen) {
    nameoffile = selectedFile.name;
  } else {
    nameoffile = "";
  }

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    setFilen(false);
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
        size={"lg"}
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">File Library</h3>
        </ModalHeader>
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
                            <Label for="fileGroupId">File Group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="select"
                              name="fileGroupId"
                              id="fileGroupId"
                              placeholder="i.e. "
                              autoComplete="given-name"
                              valid={!errors.fileGroupId}
                              invalid={
                                touched.fileGroupId && !!errors.fileGroupId
                              }
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.fileGroupId}
                            >
                              <option selected></option>
                              {filegroup.map(e => (
                                <option value={e.fileGroupId}>
                                  {e.name}
                                </option>
                              ))}
                            </Input>

                            <FormFeedback>{errors.fileGroupId}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            {/* <Label for="reference">File Name</Label> */}
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="file"
                              name="name"
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
                            />
                            <Label for="name">
                              Choose A File to Attach
                            </Label>
                            <FormFeedback>{errors.reference}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="name">File Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder={nameoffile}
                              autoComplete="given-name"
                              // defaultValue={nameoffile}
                              // valid={!errors.name}
                              // invalid={touched.name && !!errors.name}
                              // autoFocus={true}
                              // required
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              value={values.name}
                            />

                            <FormFeedback>{errors.name}</FormFeedback>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Label for="resourceGroupId">Staff group</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                            <div className="row">
                              {resourcearr}
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

export default FileLibraryAdd;
