import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "./listing.css";
import EditResouceSkill from "./edit";
import {GetListingForResourceSkill,DeleteResourceSkillDataById} from "..//shared/resourceskill";
import AddResourceSkill from './add';
import LinearProgress from '@material-ui/core/LinearProgress';




let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let count = false;


// export function changeeffect() {
//   return (count = true);
// }

let ResourceSkillListing = () => {
  let [Atlist, setAtlist] = useState([]);



  const columns = [
    {
      name: "resourceSkillId",
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
    rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
    selectableRows: "none",
    viewColumns: true
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  };

  let Tabledisplay=<LinearProgress />
  let [Tabledistatus, settabledistatus]=useState(false)
  if(Tabledistatus){
    Tabledisplay=<MUIDataTable
    title={"Resource Skills"}
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
  }, []);

  async function getlistapi() {
    const { data: Atlist } = await GetListingForResourceSkill();
    setAtlist(Atlist);
    settabledistatus(Tabledistatus=true)
  }


  async function Dellistapi() {
    await DeleteResourceSkillDataById(idofEdit);
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
      <EditResouceSkill
        click={Editstate}
        IDforAPI={idofEdit}
        cross={HandleCrossEditforlisting}
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
      <AddResourceSkill />
      {menuDiv}
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default ResourceSkillListing;
