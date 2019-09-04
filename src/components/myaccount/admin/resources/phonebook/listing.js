import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import "../../../../../scss/override/listing.scss";
import EditPhoneBook from "./edit";
import {
  GetListingpgForPhonebook,
  DeletePhoneBookDataById
} from "..//shared/phonebook";
import AddPhoneBook from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 3;

const classes = {
  linearprogress: {
    // backgroundColor: '#EE7647',
    // backgroundColor: "rgb(243, 153, 117)"
    marginLeft: "50%"
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

  let countforpagination = 0;
  let PhoneBookListing = () => {
  let [Atlist, setAtlist] = useState();
  let [paginate, setPaginate] = useState();
  let [totalcount, setTotalCount] = useState();

//   const columns = [
//     {
//       name: "phoneBookItemId",
//       label: "ID",
//       options: {
//         filter: false,
//         sort: false,
//         display: false
//       }
//     },
//     {
//       name: "name",
//       label: "Name",
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//         name: "phoneNumber",
//         label: "Phone",
//         options: {
//             filter: true,
//             sort: true
//         }
//     },
//     {
//         name: "extensions",
//         label: "Extensions",
//         options: {
//             filter: true,
//             sort: true
//         }
//     },
//     {
//         name: "email",
//         label: "Email",
//         options: {
//             filter: true,
//             sort: true
//         }
//     },
//     {
//       name: "isActive",
//       label: "Status",
//       options: {
//         filter: false,
//         sort: false,
//         display: false
//       }
//     }
    //   {
    //     name: "action",
    //     label: "Action",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       display: true
    //     }
    // }
//   ];

//   const options = {
//     filterType: "multiselect",
//     onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
//     customToolbar: () => console.log("rowData"),
//     rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
//     selectableRows: "none",
//     viewColumns: true

//     // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
//   };


//-- React Data Table
const options = {
    sortIndicator: true,
    // page: Page,
    hideSizePerPage: true,
    // paginationSize: 5,
    // hidePageListOnlyOnePage: false,
    // clearSearch: true,
    alwaysShowAllBtns: false,
    onRowClick: HandlerowSelect,
    withFirstAndLast: false,

    // onPageChange: onPageChange,
    // onSizePerPageList: sizePerPageListChange
  };
  useEffect(() => {
    getlistapi();
  }, []);



  async function getlistapi() {

    await GetListingpgForPhonebook(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    setTotalCount((totalcount = paginate.totalCount));
    TotalPages = paginate.totalPages;
    countforpagination = 0;
    settabledistatus((Tabledistatus = false));
    settabledistatus((Tabledistatus = true));
  }

  let Tabledisplay = (
<div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>  );
//   let PageSizeComp = (
//     <select onChange={handlePageSize} value={PageSize}>
//       <option selected />
//       <option value={10}>10</option>
//       <option value={20}>20</option>
//     </select>
//   );

  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div className="container">
          <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>




              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <div>
                    <BootstrapTable
                    data={Atlist}
                    version="4"
                    striped
                    hover

                    // search
                    options={options}
                    >
                    <TableHeaderColumn dataField="name" dataSort>
                    Other Numbers
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="phoneNumber" dataSort>

                    </TableHeaderColumn>

                </BootstrapTable>

                    {/* <br />
                    <div className="row">
                        <div className="col">
                            {PageSizeComp}
                            {"  Showing " + PageSize + " Rows Per Page"}
                        </div>
                        <div className="col">{paging}</div>
                    </div> */}
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"></div>
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

//--- Pagination ------------------

function handlePageSize(event) {
  PageSize = event.target.value;
  refreshfn();
}

let PageSizeComp = (
  <select onChange={handlePageSize} value={PageSize}>
    <option value={10}>10</option>
    <option value={20}>20</option>
  </select>
);

let [pgin, setPgin] = useState(true);

function handlepagin() {
  setPgin(false);
  // setTimeout(() => setPgin(true), 10);
  refreshfn();
  setPgin(true);
}

if (pgin) {
  paging = (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          previous
          disabled={!(Page > 1) ? true : false}
          tag="button"
          onClick={() => {
            if (Page > 1) {
              if (countforpagination === 0) {
                Page = Page - 1;
                countforpagination = 1;
                handlepagin();
              }
            }
          }}
        />
      </PaginationItem>

      <PaginationItem>
        <PaginationLink
          hidden={Page === 1 ? true : false}
          tag="button"
          onClick={() => {
            if (countforpagination === 0) {
              Page = Page - 1;
              countforpagination = 1;
              handlepagin();
            }
          }}
        >
          {Page - 1}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem active>
        <PaginationLink tag="button">{Page}</PaginationLink>
      </PaginationItem>

      <PaginationItem>
        <PaginationLink
          hidden={Page === TotalPages || totalcount < 11 ? true : false}
          tag="button"
          onClick={() => {
            if (countforpagination === 0) {
              Page = Page + 1;
              countforpagination = 1;
              handlepagin();
            }
          }}
        >
          {Page + 1}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem>
        <PaginationLink
          next
          disabled={Page === TotalPages || totalcount < 11 ? true : false}
          tag="button"
          onClick={() => {
            if (countforpagination === 0) {
              Page = Page + 1;
              countforpagination = 1;
              handlepagin();
            }
          }}
        />
      </PaginationItem>
    </Pagination>
  );
} else {
  paging = "";
}

//----- Finished Pagination---------

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
  function HandlerowSelect  (row) {
    menuDiv = "";
    idofEdit = row.phoneBookItemId;
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
