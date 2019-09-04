import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
import VatCodeEdit from "./edit";
import VatCodeAdd from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../scss/override/listing.scss";
import {
  GetListingForTaxCode,
  DeleteTaxCodeDataById
} from "../shared/vatcode";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages;

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

let VatCodeListing = () => {
  let [Atlist, setAtlist] = useState([
    { code: "", rate: 0, description: "", isActive: true }
  ]);
  let [paginate, setPaginate] = useState();
  let [totalcount, setTotalCount] = useState();

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

  // function sizePerPageListChange(sizePerPage) {
  //   PageSize=sizePerPage;
  //   getlistapi();
  // };

  // function onPageChange(page, sizePerPage) {
  //   Page=page;
  //   PageSize=sizePerPage;
  //   getlistapi()
  // };

  //---- Material Table

  // const columns = [
  //   {
  //     name: "FuelcostId",
  //     label: "ID",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       display: false
  //     }
  //   },
  //   {
  //     name: "StartDate",
  //     label: "From",
  //     options: {
  //       filter: true,
  //       sort: true
  //     }
  //   },
  //   {
  //     name: "EndDate",
  //     label: "To",
  //     options: {
  //       filter: true,
  //       sort: true
  //     }
  //   },
  //   {
  //     name: "CostPerLitre",
  //     label: "Fuel Cost",
  //     options: {
  //       filter: true,
  //       sort: true
  //     }
  //   },
  //   {
  //     name: "CurrencyCode",
  //     label: "Currency",
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
  //   }
  // ];

  // const options = {
  //   filterType: "multiselect",
  //   onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
  //   rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
  //   selectableRows: "none",
  //   viewColumns: true

  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  // };

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);



  let refreshfn = () => {
    settabledistatus((Tabledistatus = false));
    getlistapi();
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    await GetListingForTaxCode(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
    TotalPages = paginate.totalPages;
    setTotalCount((totalcount = paginate.totalCount));
    settabledistatus((Tabledistatus = true));
  }
  //--- Pagination ------------------

  function handlePageSize(event) {
    PageSize = event.target.value;
    refreshfn();
  }

  let PageSizeComp = (
    <select onChange={handlePageSize} value={PageSize}>
      <option selected />
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
              hidden={!(Page > 1) ? true : false}
              tag="button"
              onClick={() => {
                  Page = Page - 1;
                  handlepagin();
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              hidden={(Page === 1) ? true : false}
              tag="button"
              onClick={() => {
                  Page = Page - 1;
                  handlepagin();
              }}
            >
              {Page-1}
              </PaginationLink>
          </PaginationItem>

          <PaginationItem
          active
          >
            <PaginationLink
              tag="button"
            >
              {Page}
              </PaginationLink>
          </PaginationItem>

          <PaginationItem >
            <PaginationLink
              hidden={((Page === TotalPages)||((totalcount<11))) ? true : false}
              tag="button"
              onClick={() => {
                  Page = Page + 1;
                  handlepagin();
              }}
            >
              {Page+1}
              </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              next
              hidden={((Page === TotalPages)||(totalcount<11)) ? true : false}
              tag="button"
              onClick={() => {
                  Page = Page + 1;
                  handlepagin();

              }}
            />
          </PaginationItem>
        </Pagination>
      );

  } else {
    paging = "";
  }

  //----- Finished Pagination---------

  if (Tabledistatus) {
    Tabledisplay = (
      // <MUIDataTable
      //   title={"Actions & Filters"}
      //   data={Atlist}
      //   columns={columns}
      //   options={options}
      // />
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
          <TableHeaderColumn dataField="code" dataSort>
            Code
          </TableHeaderColumn>
          <TableHeaderColumn isKey={true} hidden={true} dataField="isActive"  dataSort>
            Active
          </TableHeaderColumn>
          <TableHeaderColumn dataField="rate" dataSort>
            VAT%
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" dataSort>
            Description
          </TableHeaderColumn>
        </BootstrapTable>
        <br />
        <div className="row">
          <div className="col-6 col-sm-4 col-md-8 col-lg-9 col-xl-10">
            {PageSizeComp}
            {"  Showing " + PageSize + " Rows Per Page"}
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">{paging}</div>
        </div>
      </div>
    );
  } else {
    Tabledisplay = (
      <LinearProgress style={classes.linearprogress} color="secondary" />
    );
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
    await DeleteTaxCodeDataById(idofEdit)
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
      <VatCodeEdit
        IDforAPI={idofEdit}
        refresh={refreshfn}
        cross={HandleCrossEditforlisting}
      />
    );
  } else {
    EditshowModel = "";
  }

  let [menushow, setMenushow] = useState(false);
  function HandlerowSelect(row) {
    menuDiv = "";
    idofEdit = row.taxCodeId;
    console.log(idofEdit);
    return setMenushow((menushow = true));
  }
  let Handlerowclose = row => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <VatCodeAdd refresh={refreshfn} />
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
        <VatCodeAdd refresh={refreshfn} />
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
          <h3 className="heading">VAT CODE</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default VatCodeListing;
