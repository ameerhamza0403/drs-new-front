import React, { useState, useEffect } from "react";
//import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditCustomerAssets from "./edit";
import {
  GetListingForCustomerAsset,
  DeleteCustomerAssetDataById
} from "..//shared/customerasset";
import AddCustomerAssets from "./add";
import { Spinner } from "reactstrap";
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
let screencontent = "";

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
  },
  plusbutton: {
    color: "white",
    borderRadius: "50px",
    width: "10px",
    cursor: "pointer",
    float: "left"
    // marginTop: '10px',
    // marginLeft: '5px',
  }
};

let countforpagination = 0;

let CustomerAssetsListing = () => {
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
  //       name: "active",
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
    withFirstAndLast: false

    // onPageChange: onPageChange,
    // onSizePerPageList: sizePerPageListChange
  };
  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    await GetListingForCustomerAsset(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      console.log(res.data);
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });

    Atlist.map(e=>{
      if(!(e.installDate===null)){
        e.installDate =
        e.installDate.substr(0, e.installDate.length - 9)

      }
      if(!(e.warrantyExpiry===null)){
        e.warrantyExpiry =
        e.warrantyExpiry.substr(0, e.warrantyExpiry.length - 9)

      }
    })


    setTotalCount((totalcount = paginate.totalCount));
    TotalPages = paginate.totalPages;
    countforpagination = 0;
    settabledistatus((Tabledistatus = false));
    settabledistatus((Tabledistatus = true));
  }

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );

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

  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
        <BootstrapTable
          headerStyle={ { background: '#DDDDDD', maxHeight:'40px', } }
          data={Atlist}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
          // cellEdit={cellEditProp}
        >
          <TableHeaderColumn dataField="name" dataSort>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerAssetCode" dataSort>
            Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerAssetTypeName" dataSort>
            Asset Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="modelName" dataSort>
            Model
          </TableHeaderColumn>
          <TableHeaderColumn dataField="makeName" dataSort>
            Make
          </TableHeaderColumn>
          <TableHeaderColumn dataField="serialNumber" dataSort>
          Serial Number
          </TableHeaderColumn>
          <TableHeaderColumn dataField="barCode" dataSort>
            Bar Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="installDate" dataSort>
          Install Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="warrantyExpiry" dataSort>
          Expiry Date
          </TableHeaderColumn>
          {/* <TableHeaderColumn dataField="notes" dataSort>
            Notes
          </TableHeaderColumn> */}
          <TableHeaderColumn
            dataField="isActive"
            hidden={true}
            isKey={true}
            dataSort
          >
            isActive
          </TableHeaderColumn>
        </BootstrapTable>
        <br />
        <div className="row">
          <div className="col-6 col-sm-4 col-md-8 col-lg-9 col-xl-10">
            {"  Showing "} {PageSizeComp} {" Results"}
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            {paging}
          </div>
        </div>
      </div>
    );
  } else {
    Tabledisplay = (
      <div style={classes.linearprogress}>
        <Spinner type="grow" color="dark" />
      </div>
    );
  }

  let [screen, setScreen] = useState(1);

  function ChangeScreen(val) {
    setScreen(val);
    if (val === 1) {
      refreshfn();
    }
  }
  switch (screen) {
    case 1:
      screencontent = <div>{Tabledisplay}</div>;
      // }
      break;
    case 2:
      screencontent = (
        <AddCustomerAssets
          backmain={ChangeScreen}
          success={success}
          error={errort}
        />
      );
      break;
    case 3:
      screencontent = (
        <EditCustomerAssets
          backmain={ChangeScreen}
          success={success}
          error={errort}
          IDforAPI={idofEdit}
        />
      );
      break;
  }

  let refreshfn = () => {
    settabledistatus((Tabledistatus = false));
    getlistapi();
  };

  // Toast

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function success() {
    return toast.success("Succesfull... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  async function Dellistapi() {
    await DeleteCustomerAssetDataById(idofEdit)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    Handlerowclose();
    refreshfn();
  }





  let [menushow, setMenushow] = useState(false);
  function HandlerowSelect(row) {
    menuDiv = "";
    idofEdit = row.customerAssetId;
    return setMenushow((menushow = true));
  }
  let Handlerowclose = (data, meta) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <i
            className="fa fa-plus-circle fa-2x"
            style={classes.plusbutton}
            title={"Add New"}
            onClick={() => {
              setScreen(2);
            }}
          />
          {/* <AddCustomerAssets refresh={refreshfn} /> */}
        </li>
        <li
        title={"Add New"}
            onClick={() => {
              setScreen(3);
            }}>
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
        <i
          className="fa fa-plus-circle fa-2x"
          style={classes.plusbutton}
          title={"Add New"}
          onClick={() => {
            setScreen(2);
          }}
        />
        {/* <AddCustomerAssets refresh={refreshfn} /> */}
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
          <h3 className="heading">CUSTOMER ASSETS</h3>
        </div>
      </div>
      <br />
      {screencontent}
    </div>
  );
};

export default CustomerAssetsListing;
