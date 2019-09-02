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
import TextField from "@material-ui/core/TextField";
import { GetListingForVehicleAttribute } from "../shared/vehattribute";
import "./addedit.scss";

let classes = {
  multiselect: {
    width: "100%",
    border: "1px solid black",
    height: "10%",
    padding: "30px"
  },
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  }
};




let arrForAttribute=[];
let count=0;

let ManageVehAttribute = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  let ValuesAHshow = "";

  useEffect(() => {
    getlistapi();
    arrForAttribute=[]
  },[]);

  let [attr, setAtrr] = useState([
    {
      vehicleAttributeId: 0,
      name: "",
      isActive: true
    }
  ]);

  async function getlistapi() {
    const { data: attr } = await GetListingForVehicleAttribute();
    setAtrr(attr);
  }

  let [timefield, setTimefield] = useState();
  let [attribute, setAttribute] = useState();
  let Handlesave = () => {
    if (arrForAttribute === undefined) {
      handleOpen();
    } else {
      arrForAttribute[count] = " " + attribute + " " + timefield + " ";
      count = count + 1;
      // console.log(arrForAttribute)
      props.shrvalue(JSON.stringify(arrForAttribute));
      handleOpen();
    }
  };

  let ValuesAHshowfn = () => {
    return ValuesAHshow;
  };

  let [showstatusAh, setShowstatusAh] = useState(false);

  if (showstatusAh) {
    ValuesAHshow = "";
    ValuesAHshow = (
      <div className="row">
        {arrForAttribute.map((e, i) => (
            <div className="ah_divSHR" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrForAttribute.splice(i, 1),
                      setShowstatusAh((showstatusAh = !showstatusAh))
                    );
                  }}
                >
                  &#10005;
                </div>
              </div>
            </div>
        ))}
      </div>
    );
  } else {
    ValuesAHshow = "";
    ValuesAHshow = (
      <div className="row">
        {arrForAttribute.map((e, i) => (
            <div className="ah_divSHR" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrForAttribute.splice(i, 1),
                      setShowstatusAh((showstatusAh = !showstatusAh))
                    );
                  }}
                >
                  &#10005;
                </div>
              </div>
            </div>
        ))}
      </div>
    );
  }
  if (arrForAttribute.length > 0) {
    ValuesAHshow = (
      <div className="row">
        {arrForAttribute.map((e, i) => (
            <div className="ah_divSHR" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrForAttribute.splice(i, 1),
                      setShowstatusAh((showstatusAh = !showstatusAh))
                    );
                  }}
                >
                  &#10005;
                </div>
              </div>
            </div>
        ))}
      </div>
    );
  } else {
    ValuesAHshow = "Please Add  Attributes!!";
  }




  const Handlechange  = name => event => {
    if(name==='att'){
      // console.log(event.target.value)
      setAttribute(attribute = event.target.value);
    }
    else{
      setTimefield( timefield = event.target.value);
    }
  };

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

  return (
    <div onClick={handleOpen} >
      <div className="row ForaH">
          <div className="col-10 col-sm-12 col-md-12 col-lg-12 col-xl-12 ForaH">
            {ValuesAHshowfn()}
          </div>
        </div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Attribute</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row mb-2">
              <label>Attribute</label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={Handlechange('att')}
                value={attribute}
              >
                <option selected>
                  Select One...
                </option>
                {attr.map(option => (
                  <option
                    value={option.name}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mb-2">
              <TextField
                id="date"
                label="Expirydate"
                type="date"
                defaultValue="2019-05-24"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={Handlechange("time")}
              />
            </div>

          </div>
          <Button
              color="secondary"
              onClick={Handlesave}
              style={classes.button}
            >
              Save
            </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ManageVehAttribute;
