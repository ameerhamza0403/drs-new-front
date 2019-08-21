import React, { useState, useEffect } from "react";
import kpi from "../../../../images/gauge-kpi.jpg";
import "./table.scss";
import Slider from "@material-ui/core/Slider";
import {GetListingForDriverBeh, PutDriverBehDataSetById, DeleteDriverBehSetDataById} from '../shared/driverbeh';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
};
let DriverBehListing = (props) => {

  let [Atlist, setAtlist]=useState({
    name: "",
    maxVal: 0,
    minVal: 0,
    importance: 0,
    active: true
  });
  let [newdata, setnewData] =useState(props.data);

  let handleChange = (name, id )=> (event,value) => {
    return newdata.map((e,i)=>{
      console.log(id)
      if(i===id){
        if(name==='importance'){
          e.importance=parseInt(value, 10)
          // setnewData(newdata[id].importance= parseInt(value, 10) );
        }
        else{
          if(name==='minVal'){
            e.minVal=parseInt(event.target.value, 10)
            // setnewData({ ...newdata, [name]: parseInt(event.target.value, 10) })
          }
          else{
            e.maxVal=parseInt(event.target.value, 10)
            // setnewData({ ...newdata, [name]: parseInt(event.target.value, 10) })
          }
        }
      }
    })

  }

   //Tost

 function errort() {
  // add type: 'error' to options
  return toast.error("Failed with Error...", {
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

  function HandleUpdate(){
    editlisting();
  }

  async function editlisting(){
    await PutDriverBehDataSetById(props.resource, newdata).then(res => success(res.data.message)).catch(error=>errort());
    props.refresh();
  }

  function HandleDelete(){
    deletelisting();
  }

  async function deletelisting(){
    await DeleteDriverBehSetDataById(props.resource).then(res => success(res.data.message)).catch(error=>errort());
    props.refresh();
  }

  function valuetext(value) {
    return {value};
  }

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
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
                  className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"
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
          {Atlist.map((e,i)=>(
          <tr key={i}>
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
                    defaultValue ={e.minVal}
                    onChange={handleChange('minVal', i)}
                  />
                </div>
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <input
                    type="text"
                    id="txtIdlingMax"
                    maxlength="2"
                    autocomplete="off"
                    style={classes.input}
                    defaultValue ={e.maxVal}
                    onChange={handleChange('maxVal', i)}

                  />
                </div>
              </div>
            </td>
            <td style={classes.equal}>
              <div  style={classes.eighty}>
                <Slider
                  defaultValue={e.importance}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  onChange={handleChange('importance', i)}
                />
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <Button
          type="submit"
          color="primary"
          className="mr-1"
          style={classes.button}
          onClick={HandleUpdate}
        >
          Update
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="submit"
          color="primary"
          className="mr-1"
          style={classes.button}
          onClick={HandleDelete}
        >
          Delete
        </Button>
        <br />
        <br />
        </div>
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
    console.log(newdata)
  }
  return (
    <div>
      {Tabledisplay}


    </div>
  );
};

export default DriverBehListing;
