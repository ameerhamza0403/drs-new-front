import React, { Component, useState, useEffect } from "react";
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
import { GetListingForAddEdit } from "../../../resources/shared/addedit";
import {JobGroupType} from '../../shared/jobgrouptemplate';

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


let TemplateAddEdit = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

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

  let [job, setJob] = useState([
    {
      jobTypeId: 0,
      name: "test"
    },
  ]);
  let [resource, setResource] = useState([
    {
      resourceId: 0,
      name: "string"
    },
  ]);

  useEffect(() => {
    getinitiallist();
  }, []);

  async function getinitiallist() {
    const {data:Job} = await JobGroupType();
    setJob(Job);
    const { data: resource } = await GetListingForAddEdit();
    setResource(resource);
  }

    //Tost

    function errort() {
      // add type: 'error' to options
      return toast.error("Please Select all fields..", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    function success() {
      return toast.success("Saved Successfully... ", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }


  let [initialaddvalues, setinitialaddvalues]= useState({
    jobTypeId: 0,
    contact: '',
    resourceId: 0,
    resourceName: '',
    jobTypeName: '',
  });

  let handleChange = name => event =>{
    if(name==='contact'){
      setinitialaddvalues({...initialaddvalues, [name]: event.target.value});
    }
    else if(name==='jobTypeId'){
      let namer='jobTypeName';
      let index = event.target.selectedIndex;
      let optionElement = event.target.childNodes[index];
      setinitialaddvalues({...initialaddvalues, [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.getAttribute("label")});
    }
    else if(name==='resourceId'){
      let namer='resourceName';
      let index = event.target.selectedIndex;
      let optionElement = event.target.childNodes[index];
      setinitialaddvalues({
        ...initialaddvalues, [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.getAttribute("label")
      });
    }
  }

  let handlebutton =()=>{
    props.submit(initialaddvalues);
  }
  return (
    <div>
      {/* <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div> */}
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-1 col-xl-1">
          <Button style={classes.button}
            onClick={handlebutton}
          >Add</Button>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
        <Input type="select" name="select" id="exampleSelect"
          onChange={handleChange('jobTypeId')}
        >
        <option selected>Select Job Type</option>
            {job.map(e => (
              <option value={e.jobTypeId} label={e.name}>{e.name}</option>
            ))}
          </Input>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <Input
            type="text"
            defaultValue={""}
            placeholder={"Enter Contact."}
            onChange={handleChange('contact')}
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
        <Input type="select" name="select" id="exampleSelect"
          onChange={handleChange('resourceId')}
        >
        <option selected>Select Resource</option>
            {resource.map(e => (
              <option value={e.resourceId} label={e.name}>{e.name}</option>
            ))}
          </Input>
        </div>
      </div>
    </div>
  );
};

export default TemplateAddEdit;
