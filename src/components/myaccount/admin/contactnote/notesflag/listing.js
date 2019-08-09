import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import icon1 from "..//..//..//..//images/icon-1.png";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import AutoIcon from "@material-ui/icons/WbIridescent";
import "./listing.css";
import EditButton from "./edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import EditButtonForNotesFlag from "./edit";
import LinearProgress from '@material-ui/core/LinearProgress';
import AddButtonForNotesFlag from './add';


import {
  DeleteNoteflagDataById,
  GetListingForNoteflag
} from "..//shared/notesflag";

let menuDiv = "";
let EditshowModel = "";
let ColorStyle = {};
let idofEdit = 0;
let count = 0;
let NotesFlagListingTable = () => {
  let ColorStyleFn = mycolor => {
    let code = "#" + mycolor;
    return (ColorStyle = {
      background: code
    });
  };

  let [Atlist, setAtlist] = useState([
    {
      colorCode: "",
      name: ""
    }
  ]);

  const columns = [
    {
      name: "noteFlagId",
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
    },
    {
      name: "colorCode",
      label: "Color",
      options: {
        filter: false,
        sort: false
      }
    }
  ];
  // const data = [
  //     ['Cupcake', <div className='ColorCodesl' style={ColorStyleFn('00000')}></div>],
  //     ['BCake', <div className='ColorCodesl' style={ColorStyleFn('E0200')}></div>],
  //     ['ZCake', <div className='ColorCodesl' style={ColorStyleFn('F0F00')}></div>],
  // ];

  const options = {
    filterType: "multiselect",
    onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
    rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
    selectableRows: "none",
    viewColumns: true
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  };

  let Tabledisplay=<LinearProgress />
      let [Tabledistatus, settabledistatus]=useState(false)
      if(Tabledistatus){
        Tabledisplay=<MUIDataTable 
        title={"Notes Flag"} 
        data={Atlist} 
        columns={columns} 
        options={options} 
        
    />;
      }
      else{
        Tabledisplay=<LinearProgress />
      }
      let refreshfn=()=>{
        settabledistatus(Tabledistatus=false)
        getlistapi();
      }

  useEffect(() => {
    getlistapi();
  }, [count]);

  async function getlistapi() {
    let { data: Atlist } = await GetListingForNoteflag();
    setAtlist(Atlist);
    Atlist.map(
      (e, i) =>
        (Atlist[i].colorCode = (
          <div className="ColorCodesl" style={ColorStyleFn(e.colorCode)} />
        ))
    );
    settabledistatus(Tabledistatus=true)
  }

  async function Dellistapi() {
    await DeleteNoteflagDataById(idofEdit);
    Handlerowclose();
    refreshfn();
  }

  const StyledMenuItem = withStyles(theme => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

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
      <EditButtonForNotesFlag
        click={Editstate}
        cross={HandleCrossEditforlisting}
        IDforAPI={idofEdit}
        refresh={refreshfn}
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
      <div className="container menu">
        <div className="row menu">
          <div
            className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu"
            onClick={HandleEditforlisting}
          >
            Edit
          </div>
          <div
            className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu"
            onClick={Dellistapi}
          >
            Delete
          </div>
          <div
            className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu"
            onClick={Handlerowclose}
          >
            Close
          </div>
        </div>
      </div>
    );
  } else if (!menushow) {
    menuDiv = <div className="container empty" />;
  }

  return (
    <div>
      <AddButtonForNotesFlag refresh={refreshfn}/>
      {menuDiv}
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default NotesFlagListingTable;
