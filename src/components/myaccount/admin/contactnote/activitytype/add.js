import { PostListingForActivityType } from "../shared/activitytype";
import React, { Component, useState } from "react";
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
import './add.scss';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let valofCod = "";

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

};

let AddActivityType = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    // colorCode: "",
    isActive: true
  });

  const handleChange = name => event => {
    if (name != "isActive") {
      setValues({ ...values, [name]: event.target.value });
    } else {
      setValues({ ...values, [name]: event.target.checked });
    }
  };

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
      backgroundColor: code,
    });
  };

      //Toast

      function errort() {
        // add type: 'error' to options
        return toast.error('Failed with Error...', {
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

  async function postlistapi() {
    await PostListingForActivityType(values).then(res => success(res.data.message)).catch(error=>errort());
    handleOpen();
    props.refresh();
  }

  let showSlccode = (
    <div className="ColorCodesl" style={ColorStyleFn("000000")} />
  );
  // let [Slctdcode, setSlctdcode]= React.useState('000000');
  let [codeswitch, setCodeswitch] = React.useState("false");
  let SelectColor = event => {
    let namer = "colour";
    //console.log(event.target.getAttribute('value'))
    // setSlctdcode({ Slctdcode: event.target.getAttribute('value')})
    valofCod = event.target.getAttribute("value");
    setValues({ ...values, [namer]: valofCod });
    setCodeswitch({ codeswitch: true });
    // console.log(Slctdcode + 'Hello')
  };
  if (codeswitch) {
    // console.log(valofCod + 'helooo')
    showSlccode = (
      <div className="ColorCodesl" style={ColorStyleFn(valofCod)} />
    );
  } else {
    showSlccode = (
      <div className="ColorCodesl" style={ColorStyleFn("000000")} />
    );
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
      >
        <ModalHeader toggle={handleOpen}>Add Activity Type</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="container">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    onChange={handleChange("name")}
                  />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="true"
                  id="defaultCheck2"
                  onChange={handleChange("isActive")}
                />
                <label className="form-check-label" for="defaultCheck2">
                  isActive
                </label>
              </form>
              <br />
              <div class="form-group">
                <div className="row">
                  <p>Color&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
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
          </div>
          <ModalFooter>
            <Button
              variant="contained"
              style={classes.button}
              onClick={postlistapi}
            >
              Save
            </Button>

            <Button
              color="secondary"
              onClick={handleOpen}
              style={classes.button}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};


export default AddActivityType;
