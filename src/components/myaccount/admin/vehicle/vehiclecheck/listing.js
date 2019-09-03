import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditCurrency from "./edit";
import {
  GetListingForVehicleCheck,
  DeleteVehicleCheckDataById,
  GetVehicleCheckDataByTypeId
} from "..//shared/vehiclecheck";
import { GetListingForVehicleChecktype } from "..//shared/vehiclechecktype";
import AddVehicleCheck from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetVehicleCheckDataById } from "../shared/vehiclecheck";

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;

const classes = {
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
  }
};

let VehicleCheck = () => {
  let [Atlist, setAtlist] = useState([]);
  let [checktype, setChecktype] = useState([]);
  let [selectdistatus, setSelectdistatus] = useState(false);
  let [reselect, setReselect] = useState("none");
  let [Tabledistatus, settabledistatus] = useState(false);

  const columns = [
    {
      name: "vehicleCheckId",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    },
    {
      name: "vehicleCheckTypeId",
      label: "Vehicle Check ID",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    },
    {
      name: "checkName",
      label: "Vehicle Check",
      options: {
        filter: false,
        sort: false,
        display: true
      }
    },
    {
      name: "defectName",
      label: "Defect Name",
      options: {
        filter: false,
        sort: false,
        display: true
      }
    },
    {
      name: "atRisk",
      label: "Risk Status",
      options: {
        filter: false,
        sort: false,
        display: true
      }
    },
    {
      name: "isActive",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    },
    {
      name: "requiresPhoto",
      label: "Requires Photo",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    }
  ];

  const options = {
    filterType: "multiselect",
    onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
    customToolbar: () => console.log("rowData"),
    rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
    selectableRows: "none",
    viewColumns: true

    // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  };

  let Tabledisplay = "";
  let handleChange = event => {
    setReselect((reselect = event.target.value));
    getlistByResID(reselect);
  };

  async function getlistByResID(id) {
    settabledistatus((Tabledistatus = false));
    const { data: Atlist } = await GetVehicleCheckDataByTypeId(id);
    setAtlist(Atlist);
    Atlist.map((e, i) => (e.atRisk = atriskicon(e.atRisk)));
    settabledistatus((Tabledistatus = true));
  }

  let selectdisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  if (selectdistatus) {
    selectdisplay = (
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleChange}
      >
        <option selected value={"none"}>
          None
        </option>
        {checktype.map(e => (
          <option value={e.vehicleCheckTypeId}>{e.name}</option>
        ))}
      </select>
    );
  } else {
    selectdisplay = (
      <LinearProgress style={classes.linearprogress} color="secondary" />
    );
  }

  let refreshfn = () => {
    settabledistatus((Tabledistatus = false));
    getlistByResID(reselect);
  };

  useEffect(() => {
    getlistapi();
  }, []);

  function atriskicon(status) {
    if (status) {
      return <i className="fa fa-exclamation-triangle" />;
    } else {
      return <i className="" />;
    }
  }
  async function getlistapi() {
    const { data: checktype } = await GetListingForVehicleChecktype();
    setChecktype(checktype);
    setSelectdistatus((selectdistatus = true));
  }

  // Toast

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success() {
    return toast.success("Deleted Successfully... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  async function Dellistapi() {
    await DeleteVehicleCheckDataById(idofEdit)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    Handlerowclose();
    refreshfn();
  }

  let [Editstate, setEditstate] = React.useState(false);
  let HandleEditforlisting = () => {
    return (
      setEditstate((Editstate = !Editstate)),
      Handlerowclose()
      // handleMenuClose()
    );
  };

  let HandleCrossEditforlisting = () => {
    return setEditstate((Editstate = false));
  };

  if (Tabledistatus) {
    Tabledisplay = (
      <MUIDataTable
        title={"Actions & Filters"}
        data={Atlist}
        columns={columns}
        options={options}
      />
    );
  } else {
    if (reselect === "none") {
      Tabledisplay = "";
    } else {
      Tabledisplay = (
        <LinearProgress style={classes.linearprogress} color="secondary" />
      );
    }
  }

  if (Editstate) {
    EditshowModel = (
      <EditCurrency
        IDforAPI={idofEdit}
        refresh={refreshfn}
        cross={HandleCrossEditforlisting}
      />
    );
  } else {
    EditshowModel = "";
  }

  let [menushow, setMenushow] = useState(false);
  let HandlerowSelect = (data, meta) => {
    menuDiv = "";
    idofEdit = data[0];
    return setMenushow((menushow = true));
  };
  let Handlerowclose = (data, meta) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <AddVehicleCheck refresh={refreshfn} />
        </li>
        <li onClick={HandleEditforlisting}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-pencil-square fa-2x" />
        </li>
        <li onClick={Dellistapi}>
          &nbsp;&nbsp;
          <i className="fa fa-archive fa-2x" />
        </li>
        <li onClick={Handlerowclose}>
          &nbsp;&nbsp;
          <i className="fa fa-times-rectangle fa-2x" />
        </li>
      </ul>
    );
  } else if (!menushow) {
    menuDiv = (
      <ul className="tool">
        <li />
        <AddVehicleCheck refresh={refreshfn} />
      </ul>
    );
  }

  return (
    <div>
      <div className="row header">
        <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-5">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">VEHICAL CHECK</h3>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          {selectdisplay}
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default VehicleCheck;
