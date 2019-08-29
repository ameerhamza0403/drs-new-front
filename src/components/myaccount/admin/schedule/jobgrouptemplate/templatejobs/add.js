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
import { JobGroupType } from "../../shared/jobgrouptemplate";

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
  },
  td:{
    width: '30%',
  },
  tdlast:{
    width: '10%',
  }
};

let TemplateAdd = props => {
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
    }
  ]);
  let [resource, setResource] = useState([
    {
      resourceId: 0,
      name: "string"
    }
  ]);

  useEffect(() => {
    getinitiallist();
  }, []);

  async function getinitiallist() {
    const { data: Job } = await JobGroupType();
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

  let [initialaddvalues, setinitialaddvalues] = useState({
    jobTypeId: 0,
    contact: "",
    resourceId: 0,
    resourceName: "",
    jobTypeName: "h",
    count: 0
  });

  let handleChange = name => event => {
    if (name === "contact") {
      setinitialaddvalues({ ...initialaddvalues, [name]: event.target.value });
    } else if (name === "jobTypeId") {
      let namer = "jobTypeName";
      let index = event.target.selectedIndex;
      let optionElement = event.target.childNodes[index];
      setinitialaddvalues({
        ...initialaddvalues,
        [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.getAttribute("label")
      });
    } else if (name === "resourceId") {
      let namer = "resourceName";
      let index = event.target.selectedIndex;
      let optionElement = event.target.childNodes[index];
      setinitialaddvalues({
        ...initialaddvalues,
        [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.getAttribute("label")
      });
    }
  };

  function handleKey(event){
    if(event.key==='Tab'){
      props.addnew();
    }
  }

  let handlebutton = () => {
    if (initialaddvalues.jobTypeId === 0 || initialaddvalues.resourceId === 0) {
      return errort();
    } else {
      let namer = "count";
      setinitialaddvalues({
        ...initialaddvalues,
        [namer]: initialaddvalues.count + 1
      });
      props.submit(initialaddvalues);
    }
  };
  return (
    <tr>
      <td style={classes.td}>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          onChange={handleChange("jobTypeId")}
        >
          <option selected >
            {initialaddvalues.jobTypeName}
          </option>
          {job.map(e => (
            <option value={e.jobTypeId} label={e.name}>
              {e.name}
            </option>
          ))}
        </Input>
      </td>
      <td style={classes.td}>
        <Input
          type="text"
          defaultValue={""}
          placeholder={"Enter Contact."}
          onChange={handleChange("contact")}
        />
      </td>
      <td style={classes.td}>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          onChange={handleChange("resourceId")}
          onKeyDown={handleKey}
        >
          <option selected>Select Resource</option>
          {resource.map(e => (
            <option value={e.resourceId} label={e.name}>
              {e.name}
            </option>
          ))}
        </Input>
      </td>
      <td style={classes.tdlast}>
        <i className="fa fa-check-square fa-1x" onClick={handlebutton}></i>&nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fa fa-window-close fa-1x" onClick={handlebutton}></i>
      </td>
    </tr>
  );
};

export default TemplateAdd;
