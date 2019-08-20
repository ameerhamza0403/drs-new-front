import React, { useState, useEffect } from "react";
import DriverBehListing from "./listing";
import "../../../../../scss/override/listing.scss";
import { GetListingForResourceGroup } from "../shared/resourcegroup";
import {
  GetDriverBehDataByResId,
  GetListingForDriverBeh
} from "../shared/driverbeh";
import LinearProgress from "@material-ui/core/LinearProgress";
import DriverBehListingdefault from "./listingdefault";
import { Button } from "reactstrap";

let classes = {
  linearprogress: {
    // backgroundColor: '#EE7647',
    backgroundColor: "rgb(243, 153, 117)"
  },
  header: {
    backgroundColor: "#EE7647",
    height: "40px",
    borderRadius: "5px",
    width: "99%",
    marginLeft: "0.5%",
    alignContent: "center",
    color: "white"
  },
  heading: {
    marginRight: "10%",
    textAlign: "right"
  },
  plusign: {
    marginLeft: "80%"
  },
  actions: {
    cursor: "pointer",
    float: "left",
    marginLeft: "70%"
  },
  select: {
    width: "200px",
    marginLeft: "2%"
  },
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  }
};
let showlist = "";
let menuDiv = "";

let DriverBehaviour = () => {
  let [Atlist, setAtlist] = useState([]);
  let [Tabledistatus, settabledistatus] = useState(false);
  let [showliststate, setShowliststate] = useState(false);
  let [reselect, setReselect] = useState('any');
  let [reslist, setReslist] = useState([]);
  let [menushow, setMenushow] = useState(false);
  let [newbtn, setnewbtn]= useState(false);

  let handleChange = event => {
    setReselect((reselect = event.target.value));
    setShowliststate(false);
    setMenushow(false);
    setnewbtn(false);
    getlistByResID(reselect);
  };


  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    const { data: Atlist } = await GetListingForResourceGroup();

    setAtlist(Atlist);
    settabledistatus((Tabledistatus = true));
    getlistByResID("any");
  }

  async function getlistByResID(id) {
    if (id === "any") {
      const { data: reslist } = await GetListingForDriverBeh();
      setReslist(reslist);
      setMenushow(true);
      return setShowliststate(true);
    } else {
      const { data: reslist } = await GetDriverBehDataByResId(id);
      setReslist(reslist);
      if (reslist.length === 0) {
        setMenushow(false);
        return setShowliststate(false);
      } else {
        setMenushow(true);
        return setShowliststate(true);
      }
    }
  }

  let handleCreate =()=>{
    getlistByResID('any');
    setnewbtn(true);
  }


  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  if (Tabledistatus) {
    Tabledisplay = (
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleChange}
      >
        <option selected value={"any"}>
          Any Group
        </option>
        {Atlist.map(e => (
          <option value={e.resourceGroupId}>{e.name}</option>
        ))}
      </select>
    );
  } else {
    Tabledisplay = (
      <LinearProgress style={classes.linearprogress} color="secondary" />
    );
  }
  if (showliststate) {
    if (reselect === "any") {
      showlist = <DriverBehListingdefault data={reslist} />;
    } else {
      if(newbtn){
        showlist = <DriverBehListingdefault data={reslist} createnew={newbtn} resource={reselect}/>;
      }
      else{
        showlist = <DriverBehListing data={reslist} />;

      }
    }
  } else {
    showlist = (
      <div id="divNoScore">
        No scoring system has been created specifically for this group yet
        <br />
        The one set up for the whole company will be used for resources in this
        group
        <br />
        Do you want to add a specific scoring system for this group?
        <br />
        <br />
        <Button
          type="submit"
          color="primary"
          className="mr-1"
          style={classes.button}
          onClick={handleCreate}
        >
          Create New
        </Button>
      </div>
    );
  }
  let refreshfn = () => {
    settabledistatus((Tabledistatus = false));
    getlistapi();
  };
  if (menushow) {
    if (reselect === "any") {
      menuDiv = "";
    } else {
      menuDiv = (
        <ul className="tool">
          <li
            // onClick={Dellistapi}
            title={"Update"}
          >
            &nbsp;&nbsp;
            <i className="fa fa-save fa-2x" />
          </li>
          <li
            // onClick={Handlerowclose}
            title={"Delete"}
          >
            &nbsp;&nbsp;
            <i className="fa fa-times-rectangle fa-2x" />
          </li>
        </ul>
      );
    }
  } else if (!menushow) {
    menuDiv = "";
  }

  return (
    <div>
      <div className="row header">
        <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-5">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">DRIVER BEHAVIOUR</h3>
        </div>
      </div>
      <br />
      <div className="row" style={classes.select}>
        {Tabledisplay}
      </div>
      <br />
      {showlist}
    </div>
  );
};

export default DriverBehaviour;
