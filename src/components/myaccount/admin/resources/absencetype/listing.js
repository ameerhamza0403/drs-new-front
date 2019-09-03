import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditAbsence from "./edit";
import {
  GetListingpgForAbsencetype,
  DeleteAbsenceDataById
} from "..//shared/absencetype";
import AddAbsencetype from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let count = false;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 2;

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

let AbsenceListing = () => {
  let [Atlist, setAtlist] = useState([]);
  let [paginate, setPaginate] = useState();

  const columns = [
    {
      name: "absenceTypeId",
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
      name: "isActive",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    }
    //   {
    //     name: "action",
    //     label: "Action",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       display: true
    //     }
    // }
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


    await GetListingpgForAbsencetype(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    TotalPages = paginate.totalPages;
    settabledistatus((Tabledistatus = true));
  }

 // Toast

 function errort() {
  // add type: 'error' to options
  return toast.error('Failed with Error...', {
    position: toast.POSITION.BOTTOM_RIGHT
  });

}
function success() {
  return toast.success("Deleted Successfully... ", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
}

  async function Dellistapi() {
    await DeleteAbsenceDataById(idofEdit).then(() => {
      success();
    }).catch(error => {
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

  if (Editstate) {
    EditshowModel = (
      <EditAbsence
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
          <AddAbsencetype refresh={refreshfn} />
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
        <AddAbsencetype refresh={refreshfn} />
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
          <h3 className="heading">ABSENCE TYPE</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default AbsenceListing;
