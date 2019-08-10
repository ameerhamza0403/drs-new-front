import React, { useState, Component, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Divider } from "@material-ui/core";
import "./addedit.css";
import TextField from "@material-ui/core/TextField";
import WorkingHours from "./workinghrs";
import iconForForm from "..//..//..//..//images/icon-1.png";
import SkillsAdd from "./skilladd";
import SpecialHourlyRate from "./specialrate";
import AlwaysAssits from "./alwaysassist";
import {PostListingForAddEdit, GetListingForAddEdit} from '..//shared/addedit';
import {GetListingForcurrency} from '..//shared/currency';
import {GetListingForResourceGroup} from '..//..//resources/shared/resourcegroup';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F4662F",
    color: "white"
  }
}));


let count=0;
let showWebUser = "";
let AddeditAdd = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openicon, setOpenicon] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [maxWidthsm, setMaxWidthsm] = React.useState("sm");

  function handleClickOpen() {
    setOpen(true);
  }
  function HandleAddicon() {
    setOpenicon(true);
  }

  function handleClose() {
    console.log(values)
    setOpen(false);
  }
  function handleCloseicon() {
    setOpenicon(false);
  }
  const [values, setValues] = React.useState({
            name: "",
            timeZone: "",
            mobilePhone: "",
            maxTravelDistance: 0,
            jobWatchSetting: "",
            reference: "",
            code: "",
            businessKey: "",
            privateKey: "",
            tachoCard: "",
            fuelCard: "",
            payrollNumber: "",
            managerId: 0,
            holidaysStartDate: "",
            workingHours: JSON.stringify(["Mon 08:00 - 17:30",
            "Tue 08:00 - 17:30",
            "Wed 08:00 - 17:30",
            "Thu 08:00 - 17:30",
            "Fri 08:00 - 17:30"]),
            hourlyRate: 0,
            specialHourlyRate: "",
            currencyId: 0,
            webUser: "",
            vacations: 0,
            skills: "",
            newUser: true,
            email: "",
            role: "",
            viewOwnResource: true,
            tracked: false,
            owhtPrivate: true,
            hideParentInfo: true
  });

  // * *************    APIs */

  async function postlistapi() {
    await PostListingForAddEdit(values);
    handleClose();
    props.click();
  }

  let [resvalue, setResvalue]=useState([
    {
      resourceGroupId: 0,
      name: "",
      active: true,
    }
  ]);
  let [listvalue, setListvalue]=useState([
    {
      name: "",
      managerId: 19,
  }
  ]);
  let [currvalue, setCurrvalue]=useState([
    {
      currencyId: 3,
      name: "Arab Emirates Dirham",
      code: "AED",
    }
  ]);

  useEffect(() => {
    GetGroupResource();
    GetList();
    GetCurrency();
  }, [count]);

  async function GetGroupResource() {
    let { data: resvalue } = await GetListingForResourceGroup();
    setResvalue(resvalue);

  }

  async function GetList() {
    let { data: listvalue } = await GetListingForAddEdit();
    setListvalue(listvalue);

  }

  async function GetCurrency() {
    let { data: currvalue } = await GetListingForcurrency();
    setCurrvalue(currvalue);

  }

  //********************************* */

  const handleChange = name => event => {
    if((name==='viewOwnResource')||(name==='tracked')||(name==='hideParentInfo')||(name==='owhtPrivate')){
      setValues({ ...values, [name]: event.target.checked });
    }
    else{
    setValues({ ...values, [name]: event.target.value });
    }
  };

  let [webuserstatus, setWebuserstatus] = useState(false);
  let showWebUserfnn = () => {
    let name='newUser'
    setValues({ ...values, [name]: true });
    return setWebuserstatus((webuserstatus = true));
  };
  let showWebUserfno = () => {
    let name='newUser'
    setValues({ ...values, [name]: false });
    return setWebuserstatus((webuserstatus = false));
  };

  let HandleSHR=(val)=>{
    let name='specialHourlyRate'
    setValues({ ...values, [name]:  val});
  }

  let HandleWKH=(val)=>{
    let name='workingHours'
    setValues({ ...values, [name]:  val});
  }

  let HandleSkills=(val)=>{
    let name='skills'
    setValues({ ...values, [name]:  val});
  }

  if (webuserstatus) {
    showWebUser = (
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <label className="form-check-label" for="defaultCheck3">
                  Email
                </label>
              </div>
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                  onChange={handleChange("email")}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="true"
                  id="defaultCheck22"
                  onClick={handleChange('viewOwnResource')}
                />
                <label className="form-check-label" for="defaultCheck22">
                  Web user only allowed to view his own resource
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <label className="form-check-label" for="defaultCheck4">
                  Role
                </label>
              </div>
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <select className="custom-select" id="inputGroupSelect01" onChange={handleChange('webUser')}>
	<option value=""></option>
	<option value="Accounts">Accounts</option>
	<option value="Administrator">Administrator</option>
	<option value="Basic Admin User">Basic Admin User</option>
	<option value="Basic user">Basic user</option>
	<option value="Dept Manager">Dept Manager</option>
	<option value="Engineers">Engineers</option>
	<option value="JobWatch Basic User">JobWatch Basic User</option>
	<option value="Manager">Manager</option>

</select>
              </div>
            </div>
          </div>
        </div>

        <br />
      </div>
    );
  } else {
    showWebUser = (
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" />
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <select className="custom-select" id="inputGroupSelect01" onChange={handleChange('role')}>
	<option value={0}></option>
	<option value={38394}>Dave Bunting</option>
	<option value={42100}>Natasha Gower</option>
	<option value={19374}>Ridgeworks</option>
	<option value={39669}>SageSync</option>
	<option value={39176}>Service</option>
	<option value={39699}>Temp2</option>

</select>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
        </div>

        <br />
      </div>
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.root}>
          {"New Resources"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <br></br>
            <div className="container form">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck1">
                        Name *
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("name")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck2">
                        Reference
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("reference")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck3">
                        Group *
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    <select className="custom-select" id="inputGroupSelect01" onChange={handleChange('resourceGroupId')}>
                        <option value='1'></option>
                        {resvalue.map((e)=><option value={e.resourceGroupId}>{e.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck4">
                        Code
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("code")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck5">
                        Mobile phone
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("mobilePhone")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck6">
                        Business key
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("businessKey")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck7">
                        Time zone
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <select className="custom-select" id="inputGroupSelect01" onChange={handleChange('timeZone')}>
                        <option value="Pacific Standard Time">
                          (GMT-08:00) Pacific Time (US, Canada), Tijuana
                        </option>
                        <option value="Mountain Standard Time">
                          (GMT-07:00) Mountain Time (US, Canada)
                        </option>
                        <option value="Central Standard Time">
                          (GMT-06:00) Central Time (US, Canada)
                        </option>
                        <option value="Central Standard Time (Mexico)">
                          (GMT-06:00) Guadalajara, Mexico City, Monterrey
                        </option>
                        <option value="Eastern Standard Time">
                          (GMT-05:00) Eastern Time (US and Canada)
                        </option>
                        <option value="Atlantic Standard Time">
                          (GMT-04:00) Atlantic Time (Canada)
                        </option>
                        <option selected="selected" value="GMT Standard Time">
                          (GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon,
                          London
                        </option>
                        <option value="Greenwich Standard Time">
                          (GMT) Casablanca, Monrovia
                        </option>
                        <option value="Central Europe Standard Time">
                          (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana,
                          Prague
                        </option>
                        <option value="Central European Standard Time">
                          (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
                        </option>
                        <option value="Romance Standard Time">
                          (GMT+01:00) Brussels, Copenhagen, Madrid, Paris
                        </option>
                        <option value="W. Europe Standard Time">
                          (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm,
                          Vienna
                        </option>
                        <option value="W. Central Africa Standard Time">
                          (GMT+01:00) West Central Africa
                        </option>
                        <option value="E. Europe Standard Time">
                          (GMT+02:00) Bucharest
                        </option>
                        <option value="Egypt Standard Time">
                          (GMT+02:00) Cairo
                        </option>
                        <option value="FLE Standard Time">
                          (GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn,
                          Vilnius
                        </option>
                        <option value="GTB Standard Time">
                          (GMT+02:00) Athens, Istanbul, Minsk
                        </option>
                        <option value="Israel Standard Time">
                          (GMT+02:00) Jerusalem
                        </option>
                        <option value="South Africa Standard Time">
                          (GMT+02:00) Harare, Pretoria
                        </option>
                        <option value="W. Australia Standard Time">
                          (GMT+08:00) Perth
                        </option>
                        <option value="AUS Central Standard Time">
                          (GMT+09:30) Darwin
                        </option>
                        <option value="Cen. Australia Standard Time">
                          (GMT+09:30) Adelaide
                        </option>
                        <option value="AUS Eastern Standard Time">
                          (GMT+10:00) Canberra, Melbourne, Sydney
                        </option>
                        <option value="E. Australia Standard Time">
                          (GMT+10:00) Brisbane
                        </option>
                        <option value="Tasmania Standard Time">
                          (GMT+10:00) Hobart
                        </option>
                        <option value="Vladivostok Standard Time">
                          (GMT+10:00) Vladivostok
                        </option>
                        <option value="West Pacific Standard Time">
                          (GMT+10:00) Guam, Port Moresby
                        </option>
                        <option value="Central Pacific Standard Time">
                          Central Pacific Standard Time
                        </option>
                        <option value="New Zealand Standard Time">
                          (GMT+12:00) Auckland, Wellington
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck8">
                        Private key
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("privateKey")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck9">
                        Tracking settings
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value='true'
                        id="defaultCheck1"
                        onClick={handleChange('tracked')}
                      />
                      <label className="form-check-label" for="defaultCheck10">
                        Resource is tracked
                      </label>
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        id="defaultCheck1"
                        // onClick={handleChange('')}
                      />
                      <label className="form-check-label" for="defaultCheck11">
                        Can set themself as passenger (Jobwatch tracking only)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck12">
                        Tacho card
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("tachoCard")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck13">
                        JobWatch settings
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="not active for jobwatch"
                          onClick={handleChange('jobWatchSetting')}
                        />
                        <label className="form-check-label" for="inlineRadio1">
                          Not active for Jobwatch
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="only visible on schedule"
                          onClick={handleChange('jobWatchSetting')}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          Only visible on schedule
                        </label>
                      </div>
                      <br />
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value="active for jobwatch"
                          onClick={handleChange('jobWatchSetting')}
                        />
                        <label className="form-check-label" for="inlineRadio3">
                          Active for Jobwatch(1 licence(s) remaining)
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio4"
                          value="resource is subcontractor"
                          onClick={handleChange('jobWatchSetting')}
                        />
                        <label className="form-check-label" for="inlineRadio4">
                          Resource is subcontractor(0 licence(s) remaining)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck14">
                        Fuel card
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("fuelCard")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck15">
                        JobWatch settings
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        id="true"
                        onClick={handleChange('hideParentInfo')}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        Hide contacts' parent info on the device
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Max. travel distance for a job
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="00"
                        onChange={handleChange("maxTravelDistance")}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                      <label className="form-check-label" for="defaultCheck16">
                        crow-fly distance from start location (mi)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              <br />
              <Divider />
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Payroll number
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("payrollNumber")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Manager *
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <select className="custom-select" id="inputGroupSelect02" onChange={handleChange('managerId')}>
                        <option selected="selected" value="19"></option>
                        {listvalue.map((e)=><option value={e.managerId}>{e.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Start of Holiday Year
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue="2019-05-24"
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange('holidaysStartDate')}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck1">
                        Number of days vacation
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("vacations")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Working Hours
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <WorkingHours addwh={HandleWKH}/>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        id="defaultCheck1"
                        onClick={handleChange('owhtPrivate')}
                      />
                      <label className="form-check-label" for="defaultCheck17">
                        Out of working hour tracking data is private
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck18">
                        Icon
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <img src={iconForForm} />
                      <Button onClick={HandleAddicon} color="primary">
                        Change Icon
                      </Button>
                      <Dialog
                        fullScreen={fullScreen}
                        fullWidth={fullWidth}
                        maxWidth={maxWidthsm}
                        open={openicon}
                        onClose={handleCloseicon}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle
                          id="responsive-dialog-title"
                          className={classes.root}
                        >
                          Import Working Hour
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseicon} color="primary">
                            Save
                          </Button>
                          <Button
                            onClick={handleCloseicon}
                            color="primary"
                            autoFocus
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck19">
                        Default hourly rate *
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        onChange={handleChange("hourlyRate")}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <select className="custom-select" id="inputGroupSelect02" onClick={handleChange('currencyId')}>
                        <option value="1"></option>
                        {currvalue.map((e)=><option value={e.currencyId}>{e.code}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck19">
                        Special hourly rate
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <SpecialHourlyRate shrvalue={HandleSHR} />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck16">
                        Skills
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <SkillsAdd Savalue={HandleSkills}/>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck15">
                        Always assists
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <AlwaysAssits />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              <br />

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label className="form-check-label" for="defaultCheck15">
                        Web user
                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio20"
                          value="true"
                          onChange={showWebUserfno}
                        />
                        <label className="form-check-label" for="inlineRadio20">
                          Link to an existing web user
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio22"
                          value="true"
                          onChange={showWebUserfnn}
                        />
                        <label className="form-check-label" for="inlineRadio22">
                          Create a new web user
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" />
              </div>
              {showWebUser}
              <br />
              <Divider />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={postlistapi} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddeditAdd;
