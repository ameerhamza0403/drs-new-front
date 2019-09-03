import {
  GetContactGroupDataById,
  PutContactGroupDataById
} from "..//shared/contact";
import React, { Component, useState, useEffect } from "react";
import { PostListingForContactGroup } from "..//shared/contact";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let iconpack = "https://cdn.bigchangeapps.com/img/Map/cn/40/air-n.png";

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
  icon: {
    cursor: "pointer"
  }
};

let EditButton = props => {
  let iconData = [
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack,
    iconpack
  ];

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

  async function postlistapi() {
    await PutContactGroupDataById(props.IDforAPI, values)
      .then(() => success())
      .catch(error => errort());

    handleOpen();
    props.refresh();

  }

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: values } = await GetContactGroupDataById(props.IDforAPI);
    setValues(values);
    setModal(true);
  }



  const [values, setValues] = React.useState({
    name: "",
    icon: "",
    isActive: false
  });

  const handleChange = name => event => {
    if (name != "isActive") {
      setValues({ ...values, [name]: event.target.value });
    } else {
      setValues({ ...values, [name]: event.target.checked });
    }
  };

  const handleiconChange = event => {
    let name = "icon";
    let valofCod;
    valofCod = event.target.getAttribute("value");
    setValues({ ...values, [name]: valofCod });
    handleOpenMT();
  };

  let [modalMT, setModalMT] = useState(false);

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = false)), setTimeout(() => props.cross(), 200);
  };


  let handleOpenMT = () => {
    return setModalMT((modalMT = !modalMT));
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>Note Type</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    defaultValue={values.name}
                    onChange={handleChange("name")}
                  />
                </div>
              </div>
              <br />
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="true"
                  id="defaultCheck1"
                  onChange={handleChange("isActive")}
                  defaultChecked={values.isActive}
                />
                <label className="form-check-label" for="defaultCheck1">
                  isActive
                </label>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="form-group">
                  <label for="exampleInputEmail1">Icon</label>
                  <img src={values.icon} />
                  <br />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={handleOpenMT}
                  >
                    Change Icon
                  </Button>
                  <br />
                </div>
              </div>
              <Modal
                isOpen={modalMT}
                toggle={handleOpenMT}
                className={"modal-primary " + props.className}
              >
                <ModalHeader toggle={handleOpenMT}>Note Type</ModalHeader>
                <ModalBody>
                  <div className="container">
                    <div className="row">
                      {iconData.map(element => (
                        <div className="col">
                          <img
                            src={element}
                            style={classes.icon}
                            value={element}
                            onClick={handleiconChange}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>

          <ModalFooter>
            <Button
              variant="contained"
              className={classes.button}
              onClick={postlistapi}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditButton;
