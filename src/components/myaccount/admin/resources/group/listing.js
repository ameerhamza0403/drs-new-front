import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "./listing.scss";
import EditGroup from "./edit";
import {
  GetListingForResourceGroup,
  DeleteResourceGroupDataById
} from "..//shared/resourcegroup";
import ResourceAddGroup from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";

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

let ResourceGroupListing = () => {
  let [Atlist, setAtlist] = useState([]);

  const columns = [
    {
      name: "resourceGroupId",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "active",
      label: "Status",
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

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);
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
    const { data: Atlist } = await GetListingForResourceGroup();
    setAtlist(Atlist);
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
    settabledistatus((Tabledistatus = true));
  }

  async function Dellistapi() {
    await DeleteResourceGroupDataById(idofEdit);
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

  if (Editstate) {
    EditshowModel = (
      <EditGroup
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
      <div className="row" style={classes.actions}>
        <div onClick={HandleEditforlisting}>
          <i className="fa fa-pencil-square fa-2x" />
        </div>
        <div onClick={Dellistapi}>
          &nbsp;&nbsp;
          <i className="fa fa-archive fa-2x" />
        </div>
        <div onClick={Handlerowclose}>
          &nbsp;&nbsp;
          <i className="fa fa-times-rectangle fa-2x" />
        </div>
      </div>
    );
  } else if (!menushow) {
    menuDiv = <div className="container empty" />;
  }

  return (
    <div>
      <div className="row" style={classes.header}>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 style={classes.heading}>RESOURCE GROUP</h3>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-1 col-lg-1 col-xl-1">
          <div className="row" style={classes.plusign}>
            <ResourceAddGroup refresh={refreshfn} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default ResourceGroupListing;
