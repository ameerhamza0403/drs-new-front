import {
  GetFileLibraryDataById,
  PutFileLibraryDataById
} from "..//shared/filelibrary";
import {PostListingForFileUpload} from '../shared/filelibrary';
import { GetAllListingForFileGroup } from "../shared/filegroup";
import { GetbyidListingForResourceGroup,PostListingForResourceGroup, DeleteResourceGroupDataById } from "../shared/resourcegroup";
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


let selectedFile = new FormData();
let nameoffile = "";
let resourcearr=[];
let resarr=[];
let resgrouparr=[];

let FileLibraryEdit = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  async function onSubmit(values, { setSubmitting, setErrors }) {
    Object.keys(editValue).map(function(keyName, keyIndex) {
      if(!values.hasOwnProperty(keyName)){
        // values.keyName=editValue.keyName;
        values[keyName]=editValue[keyName]
      }
    })
    let formdata = new FormData();
    formdata.append(values.name,selectedFile);
   console.log(values)
   await PostListingForFileUpload(formdata);
    await PutFileLibraryDataById(props.IDforAPI, values)
      .then((res) =>  resarr.map(async (e)=>{
        resgrouparr.map(async (l)=>{
          await DeleteResourceGroupDataById(res.data.fileLibraryId,l);
        })
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
    return Yup.object().shape({
      fileGroupId: Yup.string()
        // .min(2, `Group has to be at least 2 characters`)
        .required("Group is required"),
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

  const [editValue, seteditValue] = useState({
    fileLibraryId: 0,
    fileGroupId: 0,
    fileGroupName: "",
    createdOn: "",
    name: "",
    isActive: true
  });



  useEffect(() => {

    getlistapi();
    getGroupList();
    getReslist();
    reslistedit();
  }, []);

  let [filegroup, setFileGroup] = useState([]);
  async function getGroupList() {
    const { data: filegroup } = await GetAllListingForFileGroup();
    setFileGroup(filegroup);
  }

  let [resource, setResource] = useState([{
    resourceGroupName:'',
    resourceGroupId:0,
  }]);

  async function getlistapi() {
    const { data: editValue } = await GetFileLibraryDataById(props.IDforAPI);
    seteditValue(editValue);
  }

  let [res,setRes]=useState(false);
  async function getReslist() {
    const { data: resource } = await GetListingForResourceGroup();
    setResource(resource);
  }

  let [resgroup, setResgroup]=useState([]);
  async function reslistedit(){
    const {data: resgroup} = await GetbyidListingForResourceGroup(props.IDforAPI,0,0);
    setResgroup(resgroup);
    resgroup.map(e=>{
      if(resgrouparr===[]){
        resgrouparr[0]=e.resourceGroupId;
      }
      else{
        resgrouparr.push(e.resourceGroupId);
      }

    })
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

  function checkifchecked(data){
    let check;
    (resgrouparr.map(e=>{
      if(e===data){
        check= true;
      }
      else{
        check= false;
      }
    }))
    console.log(check)
    return check;
  }

  if(res){
    resourcearr=(resource.map((e,i) =>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
        <input
          name={e.resourceGroupId}
          id={e.resourceGroupId}
          // valid={!errors.resourceGroupId}
          // invalid={
          //   touched.resourceGroupId &&
          //   !!errors.resourceGroupId
          // }
          // checked={checkifchecked(e.resourceGroupId)}
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

  let [filen, setFilen] = useState(false);
  let handleFileSelect = event => {
    return (selectedFile = event.target.files[0]), setFilen(true);
  };

  if (filen) {
    nameoffile = selectedFile.name;
  } else {
    nameoffile = "";
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

  let [modal, setModal] = useState(true);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size={'lg'}
      >
        <ModalHeader toggle={handleOpen}>
          <h3 className="font-weight:bold;">File Library</h3>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <Formik
              editValue={editValue}
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
                              placeholder={editValue.name}
                              // defaultValue={editValue.name}
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
                            <Label for="resourceGroupId">Resource group</Label>
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

export default FileLibraryEdit;
