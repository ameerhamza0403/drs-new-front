import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditButtonForTrackingDevice from "./edit";
import {
    GetListingForTrackingDevice,
    DeleteTrackingDeviceDataById
} from "..//shared/trackingdevice";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddTrackingDevice from "./add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

let menuDiv = "";
let EditshowModel = "";
let ColorStyle = {};
let idofEdit = 0;
let count = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 3;

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

let TrackingDeviceListing = () => {

  let [paginate, setPaginate] = useState();

  let [Atlist, setAtlist] = useState([
    {
    trackingDeviceId: "",
    code:"",
    remarks:""
    }
  ]);

  // const columns = [
  //   {
  //     name: "trackingDeviceId",
  //     label: "ID",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     }
  //   },
  //   {
  //     name: "code",
  //     label: "Code",
  //     options: {
  //       filter: true,
  //       sort: true
  //     }
  //   },
  //   {
  //       name: "remarks",
  //       label: "Remarks",
  //       options: {
  //         filter: true,
  //         sort: true
  //       }
  //   },
  //   {
  //     name: "isActive",
  //     label: "Status",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       display: false
  //     }
  //   }

  // ];

  // const options = {
  //   filterType: "multiselect",
  //   onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
  //   // onChangePage: (currentPage)=> handlechangepage(currentPage),
  //   // onChangeRowsPerPage: (numberOfRows)=> handlechangepagesize(numberOfRows),
  //   rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
  //   selectableRows: "none",
  //   viewColumns: true
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  // };
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
  withFirstAndLast: false,
  // onPageChange: onPageChange,
  // onSizePerPageList: sizePerPageListChange,
};


  let PageSizeComp = (
    <select onChange={handlePageSize} value={PageSize}>
      <option selected />
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );


  //--- Pagination ------------------

  let [pgin, setPgin] = useState(true);

  function handlepagin() {
    setPgin(false);
    // setTimeout(() => setPgin(true), 10);
    refreshfn();
    setPgin(true);
  }

  if (pgin) {
    if (Page > 2 || Page === 2) {
      if (Page === TotalPages) {
        paging = (
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page - 2;
                  handlepagin();
                }}
              >
                {Page - 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              >
                {Page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                // onClick={() => {
                //   Page = Page+1;
                //   handlepagin();

                // }}
              >
                {Page}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        );
      } else if (Page === TotalPages - 1) {
        paging = (
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page - 2;
                  handlepagin();
                }}
              >
                {Page - 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              >
                {Page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                // onClick={() => {
                //   Page = Page+1;
                //   handlepagin();

                // }}
              >
                {Page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page + 1;
                  handlepagin();
                }}
              >
                {Page + 1}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        );
      } else {
        paging = (
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page - 1;
                  handlepagin();
                }}
              >
                {Page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page;
                  handlepagin();
                }}
              >
                {Page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page + 1;
                  handlepagin();
                }}
              >
                {Page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  Page = Page + 2;
                  handlepagin();
                }}
              >
                {Page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                tag="button"
                onClick={() => {
                  Page = Page + 1;
                  handlepagin();
                }}
              />
            </PaginationItem>
          </Pagination>
        );
      }
    } else if (Page < 2) {
      paging = (
        <Pagination>
          <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={() => {
                Page = Page;
                handlepagin();
              }}
            >
              {Page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={() => {
                Page = Page + 1;
                handlepagin();
              }}
            >
              {Page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={() => {
                Page = Page + 2;
                handlepagin();
              }}
            >
              {Page + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              next
              tag="button"
              onClick={() => {
                Page = Page + 1;
                handlepagin();
              }}
            />
          </PaginationItem>
        </Pagination>
      );
    }
  } else {
    paging = "";
  }
  function handlePageSize(event) {
    PageSize = event.target.value;
    refreshfn();
  }



  //----- Finished Pagination---------

  // function handlechangepage(curntpg){
  //   Page=curntpg;
  //   //getlistapi();
  //   refreshfn();
  // }

  // function handlechangepagesize(nofrows){
  //   PageSize=nofrows;
  //   //getlistapi();
  //   refreshfn();
  // }

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
      {/* <MUIDataTable
        title={"Actions & Filters"}
        data={Atlist}
        columns={columns}
        options={options}
      /> */}
       <BootstrapTable
          data={Atlist}
          version="4"
          striped
          hover
          pagination
          search
          options={options}
        >
          <TableHeaderColumn isKey  dataField="trackingDeviceId" dataSort>
          Device Tracking ID
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="code" dataSort>
          Code
          </TableHeaderColumn>
          <TableHeaderColumn dataField="remarks" dataSort>
          Remarks
          </TableHeaderColumn>
        </BootstrapTable>
      <br />
        <div className="row">
          <div className="col">
            {PageSizeComp}
            {"  Showing " + PageSize + " Rows Per Page"}
          </div>
          <div className="col">{paging}</div>
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
  }, [count]);

  // async function getlistapi() {
  //   let { data: Atlist } = await GetListingForJobflag(Page,PageSize);
  //   setAtlist(Atlist);
  //   Atlist.map(
  //     (e, i) =>
  //       (Atlist[i].colorCode = (
  //         <div className="ColorCodesl" style={ColorStyleFn(e.colorCode)} />
  //       ))
  //   );
  //   settabledistatus((Tabledistatus = true));
  // }

  async function getlistapi() {
    await GetListingForTrackingDevice(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    TotalPages = paginate.totalPages;
    // Atlist.map(
    //   (e, i) =>
    //     (Atlist[i].colorCode = (
    //       <div className="ColorCodesl" style={ColorStyleFn(e.colorCode)} />
    //     ))
    // );
    settabledistatus((Tabledistatus = false));
    settabledistatus((Tabledistatus = true));
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
    await DeleteTrackingDeviceDataById(idofEdit)
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
      <EditButtonForTrackingDevice
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
    idofEdit = row.trackingDeviceId;
    return setMenushow((menushow = true));
  };
  let Handlerowclose = (row) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <AddTrackingDevice refresh={refreshfn} />
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
        <AddTrackingDevice refresh={refreshfn} />
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
          <h3 className="heading">TRACKING DEVICE</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default TrackingDeviceListing;
