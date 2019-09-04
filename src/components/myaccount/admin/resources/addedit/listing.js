import React, { useState, useEffect } from "react";
import "../../../../../scss/override/listing.scss";
import AddeditEdit from "./edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Icon2 from "@material-ui/icons/Clear";
import {
  GetListingpgForResource,
  DeleteAddEditDataById
} from "..//shared/addedit";
import AddeditAdd from "./add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

let idofEdit = 0;
let count = 0;
let menuDiv = "";
let EditshowModel = "";
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 2;

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

let AddeditListing = () => {
  let [paginate, setPaginate] = useState();
  let [totalcount, setTotalCount] = useState();

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  let icon = status => {
    let iconvalue = <Icon2 />;
    if (status === true) {
      iconvalue = <DoneOutlineIcon />;
    } else if (status === false) {
      iconvalue = <Icon2 />;
    }
    return iconvalue;
  };

  let iconcross = status => {
    let iconvalue = <DoneOutlineIcon />;
    if (
      status === "not active for jobwatch" ||
      status === "only visible on schedule"
    ) {
      iconvalue = <Icon2 />;
    } else {
      iconvalue = <DoneOutlineIcon />;
    }
    return iconvalue;
  };

  let [Atlist, setAtlist] = useState([
    {
      resourceId: 0,
      name: "",
      resourceGroupId: 0,
      timeZone: "",
      mobilePhone: "",
      maxTravelDistance: 0,
      jobWatchSetting: "",
      reference: "",
      code: "",
      businessKey: "",
      privateKey: "",
      tachoCard: "",
      fuelCard: "",
      payrollNumber: "",
      managerId: 0,
      holidaysStartDate: "2019-08-08T07:58:02.308Z",
      workingHours: "",
      hourlyRate: 0,
      specialHourlyRate: "",
      assistants: "",
      currencyId: 0,
      webUser: "",
      vacations: 0,
      skills: "",
      dateOfJoining: "2019-08-08T07:58:02.308Z",
      annualLeaveAllowance: 0,
      emergencyContactDetails: "",
      newUser: true,
      email: "",
      role: "",
      viewOwnResource: true,
      tracked: false,
      owhtPrivate: true,
      hideParentInfo: true
    }
  ]);
  // const columns = [
  //   {
  //     name: "resourceId",
  //     label: "ID",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       display: false
  //     }
  //   },
  //   {
  //     name: "name",
  //     label: "Name",
  //     options: {
  //       filter: true,
  //       sort: true
  //     }
  //   },
  //   {
  //     name: "isActive",
  //     label: "Status",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       display: false
  //     }
  //   },
  //   {
  //     name: "resourceGroupId",
  //     label: "Group",
  //     options: {
  //       filter: false,
  //       sort: false
  //     }
  //   },
  //   {
  //       name: "resourceGroupId",
  //       label: "Phone",
  //       options: {
  //         filter: false,
  //         sort: false
  //       }
  //     },
  //     {
  //       name: "resourceGroupId",
  //       label: "Fixed Vehical",
  //       options: {
  //         filter: false,
  //         sort: false
  //       }
  //     },
  //     {
  //       name: "tracked",
  //       label: "Resource is Tracked",
  //       options: {
  //         filter: false,
  //         sort: false
  //       }
  //     },
  //     {
  //       name: "jobWatchSetting",
  //       label: "Resource has Jobs",
  //       options: {
  //         filter: false,
  //         sort: false
  //       }
  //     }
  // ];

  //-- React Data Table
  const options = {
    sortIndicator: true,
    // page: Page,
    hideSizePerPage: true,
    // paginationSize: PageSize,
    hidePageListOnlyOnePage: true,
    sizePerPage: PageSize,
    // clearSearch: true,
    alwaysShowAllBtns: false,
    onRowClick: HandlerowSelect,
    withFirstAndLast: false
    // onPageChange: onPageChange,
    // onSizePerPageList: sizePerPageListChange,
  };
  // const options = {
  //   filterType: "multiselect",
  //   onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
  //   rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
  //   selectableRows: "none",
  //   viewColumns: true,
  //   responsive: 'scroll',
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  // };
  useEffect(() => {
    getlistapi();
  }, [count]);

  async function getlistapi() {
    await GetListingpgForResource(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    setTotalCount((totalcount = paginate.totalCount));
    TotalPages = paginate.totalPages;
    countforpagination = 0;
    settabledistatus((Tabledistatus = false));
    settabledistatus((Tabledistatus = true));
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


  function activefn(cell, row) {
    console.log(cell)
    if (cell === true) {
      return <i className="fa fa-check fa-2x"/>;
    }
    else{
      return <i className="fa fa-ban fa-2x"/>;
    }
  }

  if (Tabledistatus) {
    Tabledisplay = (
      //     <MUIDataTable
      //     title={"Filters/Actions"}
      //     data={Atlist}
      //     columns={columns}
      //     options={options}

      // />;
      <div>
        <BootstrapTable
          data={Atlist}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
        >
          <TableHeaderColumn dataField="name" dataSort>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn hidden isKey dataField="resourceId" dataSort>
            resourceId
          </TableHeaderColumn>
          <TableHeaderColumn hidden dataField="isActive" dataSort>
            isActive
          </TableHeaderColumn>
          <TableHeaderColumn dataField="resourceGroupId" dataSort>
            Resource Group Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="mobilePhone" dataSort>
            Phone
          </TableHeaderColumn>
          <TableHeaderColumn dataField="tracked" dataSort dataFormat={activefn}>
            Staff is Tracked
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="jobWatchSetting"
            dataFormat={activefn}
            dataSort
          >
            Staff Has Job
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
    return toast.success("Deleted Successfully... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  async function Dellistapi() {
    await DeleteAddEditDataById(idofEdit)
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

  if (Editstate) {
    EditshowModel = (
      <AddeditEdit
        click={Editstate}
        cross={HandleCrossEditforlisting}
        clickref={refreshfn}
        IDforAPI={idofEdit}
      />
    );
  } else {
    EditshowModel = "";
  }

  let [menushow, setMenushow] = useState(false);
  function HandlerowSelect(row) {
    menuDiv = "";
    idofEdit = row.resourceId;
    return setMenushow((menushow = true));
  }
  let Handlerowclose = row => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <AddeditAdd refresh={refreshfn} />
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
        <AddeditAdd refresh={refreshfn} />
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
          <h3 className="heading">MANAGE STAFF</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default AddeditListing;
