import React, { useState, useEffect } from "react";
import kpi from "../../../../images/gauge-kpi.jpg";
import "./table.scss";
import Slider from "@material-ui/core/Slider";
import {GetListingForDriverBeh} from '../shared/driverbeh';
import LinearProgress from '@material-ui/core/LinearProgress';

let classes = {
  equal: {
    width: "33.33%"
    // textAlign: "center"
  },
  input: {
    width: "40px",
    height: "25px",
    marginLeft: "15%",
    border: "1px solid black",
    textAlign: 'center',
  },
  eighty: {
    width: "80%",
    marginLeft: '2%',
  },
  heading:{
    fontSize: '20px',
  },
  linearprogress: {
    // backgroundColor: '#EE7647',
    backgroundColor: "rgb(243, 153, 117)"
  },
  table:{
    // width: '60%',
    // height: '80%',
    // marginLeft: '20%',
  },
};
let DriverBehListing = (props) => {

  let [Atlist, setAtlist]=useState({
    name: "",
    defaultMaxVal: 0,
    defaultMinVal: 0,
    importance: 0,
    active: null
  });

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <table className="table" style={classes.table}>
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={classes.equal}>
              Indicator
            </th>
            <th scope="col" style={classes.equal}>
              Value to reach score{" "}
            </th>
            <th scope="col" style={classes.equal}>
              Importance
            </th>
          </tr>
          <tr>
            <th scope="col" style={classes.equal} />
            <th scope="col" style={classes.equal}>
              <div className="row">
                <div
                  className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7"
                  style={classes.equal}
                >
                  <span>10/10</span>
                </div>
                <div
                  className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"
                  style={classes.equal}
                >
                  <span>0/10</span>
                </div>
              </div>
            </th>
            <th scope="col" style={classes.equal} />
          </tr>
          <tr>
            <th scope="col" style={classes.equal} />
            <th scope="col" style={classes.equal}>
              <img src={kpi} />
            </th>
            <th scope="col" style={classes.equal} />
          </tr>
        </thead>
        <tbody>
          {Atlist.map(e=>(
          <tr key={e.drvBehKPIId}>
            <td style={classes.equal}>
              <h3 style={classes.heading}>{e.name}</h3>{e.notes}
            </td>
            <td>
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <input
                    type="text"
                    id="txtIdlingMin"
                    maxlength="2"
                    autocomplete="off"
                    style={classes.input}
                    value={e.minVal}
                  />
                </div>
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <input
                    type="text"
                    id="txtIdlingMax"
                    maxlength="2"
                    autocomplete="off"
                    style={classes.input}
                    value={e.maxVal}
                  />
                </div>
              </div>
            </td>
            <td style={classes.equal}>
              <div  style={classes.eighty}>
                <Slider
                  defaultValue={e.importance}
                  // getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    Tabledisplay = (
      <LinearProgress style={classes.linearprogress} color="secondary" />
    );
  }
  let refreshfn = () => {
    settabledistatus((Tabledistatus = false));
    getlistapi();
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    // const { data: Atlist } = await GetListingForDriverBeh();
    setAtlist((Atlist=props.data));
    settabledistatus((Tabledistatus = true));
  }
  return (
    <div>
      {Tabledisplay}
    </div>
  );
};

export default DriverBehListing;
