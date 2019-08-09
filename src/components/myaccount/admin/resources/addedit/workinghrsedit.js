import React, { useState, useEffect, useRef } from "react";
import "./addedit.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

let arrofAh = [
  "Mon 08:00 - 17:30",
  "Tue 08:00 - 17:30",
  "Wed 08:00 - 17:30",
  "Thu 08:00 - 17:30",
  "Fri 08:00 - 17:30"
];
let countofah = 5;


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4662F',
    color: 'white',
  },
}));


let WorkingHours = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let [anchorEladd, setAnchorEladd] = useState(null);
  let [anchorElimp, setAnchorElimp] = useState(null);
  let [valueAH, setValueAH] = useState();
  let [valueAHF, setValueAHF] = useState();
  let [valueAHT, setValueAHT] = useState();
  let ValuesAHshow = "";
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  //.....

  let AccessHrD = [
    {
      Id: 1,
      AHDay: "Mon"
    },
    {
      Id: 2,
      AHDay: "Tue"
    },
    {
      Id: 3,
      AHDay: "Wed"
    },
    {
      Id: 4,
      AHDay: "Thu"
    },
    {
      Id: 5,
      AHDay: "Fri"
    },
    {
      Id: 6,
      AHDay: "Sat"
    },
    {
      Id: 7,
      AHDay: "Sun"
    }
  ];

  let AccessHrT = [
    {
      Id: 1,
      AHTime: "00:00"
    },
    {
      Id: 2,
      AHTime: "00:30"
    },
    {
      Id: 3,
      AHTime: "01:00"
    },
    {
      Id: 4,
      AHTime: "01:30"
    },
    {
      Id: 5,
      AHTime: "02:00"
    },
    {
      Id: 6,
      AHTime: "02:30"
    },
    {
      Id: 7,
      AHTime: "03:00"
    },
    {
      Id: 8,
      AHTime: "03:30"
    },
    {
      Id: 9,
      AHTime: "04:00"
    },
    {
      Id: 10,
      AHTime: "04:30"
    },
    {
      Id: 11,
      AHTime: "05:00"
    },
    {
      Id: 12,
      AHTime: "05:30"
    },
    {
      Id: 13,
      AHTime: "06:00"
    },
    {
      Id: 14,
      AHTime: "06:30"
    },
    {
      Id: 15,
      AHTime: "07:00"
    },
    {
      Id: 16,
      AHTime: "07:30"
    },
    {
      Id: 17,
      AHTime: "08:00"
    },
    {
      Id: 18,
      AHTime: "08:30"
    },
    {
      Id: 19,
      AHTime: "09:00"
    },
    {
      Id: 20,
      AHTime: "09:30"
    },
    {
      Id: 21,
      AHTime: "10:00"
    },
    {
      Id: 22,
      AHTime: "10:30"
    },
    {
      Id: 23,
      AHTime: "11:00"
    },
    {
      Id: 24,
      AHTime: "11:30"
    },
    {
      Id: 25,
      AHTime: "12:00"
    },
    {
      Id: 26,
      AHTime: "12:30"
    },
    {
      Id: 27,
      AHTime: "13:00"
    },
    {
      Id: 28,
      AHTime: "13:30"
    },
    {
      Id: 29,
      AHTime: "14:00"
    },
    {
      Id: 30,
      AHTime: "14:30"
    },
    {
      Id: 31,
      AHTime: "15:00"
    },
    {
      Id: 32,
      AHTime: "15:30"
    },
    {
      Id: 33,
      AHTime: "16:00"
    },
    {
      Id: 34,
      AHTime: "16:30"
    },
    {
      Id: 35,
      AHTime: "17:00"
    },
    {
      Id: 36,
      AHTime: "17:30"
    },
    {
      Id: 37,
      AHTime: "18:00"
    },
    {
      Id: 38,
      AHTime: "18:30"
    },
    {
      Id: 39,
      AHTime: "19:00"
    },
    {
      Id: 40,
      AHTime: "19:30"
    },
    {
      Id: 41,
      AHTime: "20:00"
    },
    {
      Id: 42,
      AHTime: "20:30"
    },
    {
      Id: 43,
      AHTime: "21:00"
    },
    {
      Id: 44,
      AHTime: "21:30"
    },
    {
      Id: 45,
      AHTime: "22:00"
    },
    {
      Id: 46,
      AHTime: "22:30"
    },
    {
      Id: 47,
      AHTime: "23:00"
    },
    {
      Id: 48,
      AHTime: "23:30"
    }
  ];

  //.....

  let HrCloseadd = () => {
    setAnchorEladd(null);
  };
  let HrCloseimp = () => {
    setAnchorElimp(null);
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
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="ah_div" key={i}>
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
          </div>
        ))}
      </div>
    );
  } else {
    ValuesAHshow = "";
    ValuesAHshow = (
      <div className="row">
        {arrofAh.map((e, i) => (
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="ah_div" key={i}>
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
          </div>
        ))}
      </div>
    );
  }
  if (arrofAh.length > 0) {
    ValuesAHshow = (
      <div className="row">
        {arrofAh.map((e, i) => (
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="ah_div" key={i}>
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
          </div>
        ))}
      </div>
    );
  } else {
    ValuesAHshow = "Please Add Access Hours!!";
  }
  let HandleAccesH = () => {
    if (valueAH === undefined) {
      HrCloseadd();
    } else {
      arrofAh[countofah] =
        valueAH.valueAH + " " + valueAHF.valueAHF + " - " + valueAHT.valueAHT;
      countofah = countofah + 1;
      console.log(arrofAh)
      props.addwh(JSON.stringify(arrofAh));
      HrCloseadd();
    }
  };
  let PopHrHandAdd = event => {
    setAnchorEladd(event.currentTarget);
  };

  let PopHrHandImport = event => {
    setAnchorElimp(event.currentTarget);
  };

  let HandleAccessDchange = name => event => {
    if (name === "Day") {
      setValueAH({ valueAH: event.target.value });
    } else if (name === "TimeFrom") {
      setValueAHF({ valueAHF: event.target.value });
    } else if (name === "Timeto") {
      setValueAHT({ valueAHT: event.target.value });
    }
  };
  const openadd = Boolean(anchorEladd);
  const openimp = Boolean(anchorElimp);
  return (
    <div className="row form">
      <div className="popOfhourr">
        <div className="row ForaH">
          <div className="col-10 col-sm-12 col-md-12 col-lg-12 col-xl-12 ForaH">
            {ValuesAHshowfn()}
          </div>
        </div>
        
      </div>
      <br></br>
      <Button onClick={PopHrHandAdd}>Add</Button>
      <Button onClick={PopHrHandImport}>Import</Button>
      
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openadd}
        onClose={HrCloseadd}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.root}>
          Add Working Hours
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="popOfhourradd">
              <div className="row accesshr">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <div className="row form">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
                      <label for="exampleFormControlInput1">Day</label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                      <select
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={HandleAccessDchange("Day")}
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

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <div className="row form">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
                      <label for="exampleFormControlInput1">From</label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                      <select
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={HandleAccessDchange("TimeFrom")}
                      >
                        <option value="other" selected>
                          Select One...
                        </option>
                        {AccessHrT.map(option => (
                          <option key={option.Id} value={option.AHTime}>
                            {option.AHTime}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <div className="row form">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
                      <label for="exampleFormControlInput1">To</label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                      <select
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={HandleAccessDchange("Timeto")}
                      >
                        <option value="other" selected>
                          Select One...
                        </option>
                        {AccessHrT.map(option => (
                          <option key={option.Id} value={option.AHTime}>
                            {option.AHTime}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openimp}
        onClose={HrCloseimp}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Import Working Hour
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="container">
              <div className="row">
                <select class="custom-select" id="inputGroupSelect01">
                  <option value="Alen">Alen</option>
                  <option value="Brain">Brian</option>
                </select>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HrCloseimp} color="primary">
            Save
          </Button>
          <Button onClick={HrCloseimp} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkingHours;
