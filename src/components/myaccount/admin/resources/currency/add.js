import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { PostListingForcurrency } from "..//shared/currency";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#F4662F",
    color: "white"
  },
  input: {
    display: "none"
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #F4662F",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

let AddCurrency = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    name: "Arab Emirates Dirham",
    code: "AED",
    active: false
  });

  async function postlistapi() {
    await PostListingForcurrency(values);
    handleClose();
    props.refresh();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    if ((name === "name")||(name === "code")) {
      setValues({ ...values, [name]: event.target.value });
    } else if (name === "active") {
      setValues({ ...values, [name]: event.target.checked });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="container">
            <div className="row">
              <form>
                <div className="form-group">
                <label for="exampleInputEmail1">Currency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="US Dollars"
                    onChange={handleChange("name")}
                  />
                  <br></br>
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="USD"
                    onChange={handleChange("code")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="true"
                    id="defaultCheck1"
                    onChange={handleChange("active")}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Active
                  </label>
                </div>
              </form>
            </div>
          </div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={postlistapi}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddCurrency;
