import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import "./add.css";
import { PostListingForNoteflag } from "..//shared/notesflag";

let valofCod = "";

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

let AddButtonForNotesFlag = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    name: "",
    colorCode: "",
    active: false
  });

  const handleChange = name => event => {
    if (name != "active") {
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
      background: code
    });
  };

  async function postlistapi() {
    await PostListingForNoteflag(values);
    handleClose();
    props.refresh();
  }

  let showSlccode = (
    <div className="ColorCodesl" style={ColorStyleFn("000000")} />
  );
  // let [Slctdcode, setSlctdcode]= React.useState('000000');
  let [codeswitch, setCodeswitch] = React.useState("false");
  let SelectColor = event => {
    let namer = "colorCode";
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
                onChange={handleChange("active")}
              />
              <label className="form-check-label" for="defaultCheck2">
                Active
              </label>
            </form>
            <br />
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

export default AddButtonForNotesFlag;
