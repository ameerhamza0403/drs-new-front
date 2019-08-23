import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditPhoneBook from "./edit";
import {
  GetListingForPhoneBook,
  DeletePhoneBookDataById
} from "..//shared/phonebook";
import AddPhoneBook from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Table,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Form,
    FormFeedback,
    FormGroup,
    Label,
    Input
  } from "reactstrap";


let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let count = false;

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

  let PhoneBookListing = () => {
  let [Atlist, setAtlist] = useState([]);

  const columns = [
    {
      name: "phoneBookItemId",
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
        name: "phoneNumber",
        label: "Phone",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "extensions",
        label: "Extensions",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "email",
        label: "Email",
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
      <div className="container">
          <div className="row">
              <div className="col-3"></div>
              <div className="col-3"></div>
              
              <div className="col-3">
                <Table responsive>
                    <thead>
                    <tr>
                        <th>other numbers</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Atlist.map((e,i)=>(<tr>
                        
                        <td>{e.name}  </td>  <td>{e.phoneNumber}</td>
                        
                    </tr>))}
                    <tr>
                        <td>
                        {menuDiv}
                        </td>
                    </tr>
                    </tbody>
                </Table>
              </div>
              <div className="col-3"></div>
          </div>
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
    const { data: Atlist } = await GetListingForPhoneBook();
    setAtlist(Atlist);
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
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
    await DeletePhoneBookDataById(idofEdit).then(() => {
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
      <EditPhoneBook
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
          <AddPhoneBook refresh={refreshfn} />
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
        <AddPhoneBook refresh={refreshfn} />
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
          <h3 className="heading">Phone Book</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default PhoneBookListing;
