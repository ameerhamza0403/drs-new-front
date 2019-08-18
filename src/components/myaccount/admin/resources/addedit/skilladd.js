import React, { useState, useEffect, useRef } from "react";
import "./addedit.scss";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

let arrofAh = [];
let countofah = 0;


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4662F',
    color: 'white',
  },
}));


let SkillsAdd = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let [anchorEladd, setAnchorEladd] = useState(null);
  let [valueAH, setValueAH] = useState();
  let [valueAHF, setValueAHF] = useState();
  let ValuesAHshow = "";
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  //.....

  let AccessHrD = [
    {
      Id: 1,
      AHDay: "Abrasive Wheels"
    },
    {
      Id: 2,
      AHDay: "Asbestos Awareness"
    },
    {
      Id: 3,
      AHDay: "COSHH"
    },
    {
      Id: 4,
      AHDay: "CSCS"
    },
    {
      Id: 5,
      AHDay: "DriverWise"
    },
    {
      Id: 6,
      AHDay: "EN 16005"
    },
    {
      Id: 7,
      AHDay: "Fire Awareness"
    },
    {
        Id: 8,
        AHDay: "Manual Handling"
    },
    {
        Id: 9,
        AHDay: "PPE"
    },
    {
        Id: 10,
        AHDay: "Risk Assessment"
    },
    {
        Id: 11,
        AHDay: "Step Ladders"
    },
    {
        Id: 12,
        AHDay: "Working At Height"
    }
  ];


  //.....

  let HrCloseadd = () => {
    setAnchorEladd(null);
  };

  let ValuesAHshowfn = () => {
    return ValuesAHshow;
  };

  let [showstatusAh, setShowstatusAh] = useState(false);

  if (showstatusAh) {
    ValuesAHshow = "";
    ValuesAHshow = (
      <div className="row">
        {arrofAh.map((e, i) => (
            <div className="ah_divskil" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrofAh.splice(i, 1),
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
        {arrofAh.map((e, i) => (
            <div className="ah_divskil" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrofAh.splice(i, 1),
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
  if (arrofAh.length > 0) {
    ValuesAHshow = (
      <div className="row">
        {arrofAh.map((e, i) => (
            <div className="ah_divskil" key={i}>
              <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  {e}
                </div>
                <div
                  className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cross"
                  onClick={() => {
                    return (
                      arrofAh.splice(i, 1),
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
    ValuesAHshow = "Please Add Skills!!";
  }
  let HandleAccesH = () => {
    if (valueAH === undefined) {
      HrCloseadd();
    } else {
      arrofAh[countofah] =
        valueAH.valueAH + " - " + valueAHF.valueAHF ;
      countofah = countofah + 1;
      props.Savalue(JSON.stringify(arrofAh));
      HrCloseadd();
    }
  };
  let PopHrHandAdd = event => {
    setAnchorEladd(event.currentTarget);
  };



  let HandleAccessDchange = name => event => {
    if (name === "skill") {
      setValueAH({ valueAH: event.target.value });
    } else if (name === "date") {
      setValueAHF({ valueAHF: event.target.value });
    }
  };
  const openadd = Boolean(anchorEladd);
  return (
    <div className="row form">
      <div className="popOfhourrskill">
        <div className="row ForaH">
          <div className="col-10 col-sm-12 col-md-12 col-lg-12 col-xl-12 ForaH">
            {ValuesAHshowfn()}
          </div>
        </div>
        <Button onClick={PopHrHandAdd}>Add</Button>
      </div>

      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openadd}
        onClose={HrCloseadd}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.root}>
          Add Sills
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label class="form-check-label" for="defaultCheck16">
                        Skills
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    <select
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={HandleAccessDchange("skill")}
                      >
                        <option value="other" selected>
                          Select One...
                        </option>
                        {AccessHrD.map(option => (
                          <option key={option.Id} value={option.AHDay}>
                            {option.AHDay}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label class="form-check-label" for="defaultCheck16">
                        Expiry Date
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue="2017-05-24"
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={HandleAccessDchange('date')}
                      />
                    </div>
                    </div>
              </div>
              <br />
              </div>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleAccesH} color="primary">
            Save
          </Button>
          <Button onClick={HrCloseadd} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default SkillsAdd;
