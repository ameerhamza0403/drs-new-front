import React, { Component, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { GetAbsenceDataById, PutAbsenceDataById } from "..//shared/absencetype";

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

let EditAbsence = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  // setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    props.cross();
  };

  const [editvalues, seteditValues] = React.useState({});

  const handleEditChange = name => event => {
    seteditValues({ ...editvalues, [name]: event.target.value });
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: editvalues } = await GetAbsenceDataById(props.IDforAPI);
    seteditValues(editvalues);
  }

  async function putlistapi() {
    await PutAbsenceDataById(props.IDforAPI, editvalues);
    handleClose();
    props.refresh();
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.click}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="container">
            <div className="row">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={editvalues.name}
                    onChange={handleEditChange("name")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="true"
                    id="defaultCheck2"
                    onChange={handleEditChange("active")}
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    Active
                  </label>
                </div>
              </form>
            </div>
          </div>

          <Button
            variant="contained"
            className={classes.button}
            onClick={putlistapi}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditAbsence;
