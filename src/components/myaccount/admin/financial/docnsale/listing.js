import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
// import JobGroupTemplateEdit from "./edit";
// import JobGroupTemplateAdd from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../scss/override/listing.scss";
import {} from "../shared/docnsale";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {
  GetListingForFinancialDocumentnSale,
  DeleteFinancialDocumentnSaleDataById
} from "../shared/docnsale";
import DocnSaleAuto from "./autoref";
import NotestoClient from "./notes/notes";
import Adddoc from "./add";
import { Spinner } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


let menuDiv = "";
let EditshowModel = "";
let NoteshowModel = "";
let idofEdit = 0;
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

let FinanceDocListing = () => {
  let [Atlist, setAtlist] = useState([
    {
      // documentTypeId: 0,
      name: "",
      notes: "",
      label: "",
      referencePrefix: "",
      referenceFormat: "",
      nextNumber: 0,
      isActive: true
    }
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
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );
  let [Tabledistatus, settabledistatus] = useState(false);

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
          headerStyle={ { background: '#DDDDDD', maxHeight:'40px', } }
          data={Atlist}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
        >
          <TableHeaderColumn dataField="isActive" isKey={true} hidden={true}>
            isActive
          </TableHeaderColumn>

          <TableHeaderColumn dataField="name" dataSort>
            Document Type
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

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    await GetListingForFinancialDocumentnSale(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    setTotalCount((totalcount = paginate.totalCount));
    TotalPages = paginate.totalPages;
    countforpagination = 0;
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
    await DeleteFinancialDocumentnSaleDataById(idofEdit)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    Handlerowclose();
    refreshfn();
  }

  let [autorefe, setautorefe] = React.useState(false);
  let Handleautorefe = () => {
    return (
      setautorefe(true),
      // Handlecloseautorefe()
      handleMenuClose()
    );
  };

  let handleMenuClose = () => {
    setMenushow(false);
  };

  if (autorefe) {
    console.log(autorefe);
    EditshowModel = (
      <DocnSaleAuto
        IDforAPI={idofEdit}
        refresh={refreshfn}
        cross={Handlecloseautorefe}
      />
    );
    console.log("heloo");
  } else {
    console.log(autorefe);
    EditshowModel = "";
  }

  function Handlecloseautorefe() {
    return setautorefe((autorefe = false));
  }

  let [notes, setNotes] = React.useState(false);
  let HandleNotes = () => {
    return (
      setNotes((notes = !notes)),
      // handleclosenotes()
      handleMenuClose()
    );
  };

  let handleclosenotes = () => {
    return setNotes((notes = false));
  };

  if (notes) {
    NoteshowModel = (
      <NotestoClient
        IDforAPI={idofEdit}
        refresh={refreshfn}
        cross={handleclosenotes}
      />
    );
  } else {
    NoteshowModel = "";
  }

  let [menushow, setMenushow] = useState(false);
  function HandlerowSelect(row) {
    menuDiv = "";
    idofEdit = row.documentTypeId;
    // Handlerowclose();
    setTimeout(() => {
      setMenushow((menushow = false));
    }, 10);
    setTimeout(() => {
      setMenushow((menushow = true));
    }, 10);
    return setMenushow((menushow = true));
  }
  let Handlerowclose = row => {
    return setMenushow((menushow = false));
  };

  async function Dellistapi() {
    await DeleteFinancialDocumentnSaleDataById(idofEdit)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    Handlerowclose();
    refreshfn();
  }

  if (menushow) {
    if (
      idofEdit === 2 ||
      idofEdit === 3 ||
      idofEdit === 4 ||
      idofEdit === 5 ||
      idofEdit === 6
    ) {
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title="Automatic Reference" onClick={Handleautorefe}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          <li title="Notes to Clients" onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
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
    } else if (idofEdit === 7) {
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title="Automatic Reference" onClick={Handleautorefe}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          {/* <li title='Notes to Clients' onClick={Handleautorefe}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
          </li> */}
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
    } else if (idofEdit === 8) {
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title="Automatic Reference" onClick={Handleautorefe}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          <li title="Notes to Clients" onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
          </li>
          {/* <li title='Quote Acceptance' onClick={Handleautorefe}>
            &nbsp;&nbsp;
            <i className="fa fa-pencil fa-2x" />
          </li> */}
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
    } else if (idofEdit === 1) {
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title="Automatic Reference" onClick={Handleautorefe}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          {/* <li title='Series' onClick={Handleautorefe}>
            &nbsp;&nbsp;
            <i className="fa fa-calculator fa-2x" />
          </li> */}
          <li title="Notes to Clients" onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
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
    } else {
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title="Automatic Reference" onClick={Handleautorefe}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          {/* <li title='Series' onClick={Handleautorefe}>
            &nbsp;&nbsp;
            <i className="fa fa-calculator fa-2x" />
          </li> */}
          <li title="Notes to Clients" onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
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
    }
  } else if (!menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <Adddoc refresh={refreshfn} />
        </li>
        {/* <JobGroupTemplateAdd refresh={refreshfn} /> */}
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
          <h3 className="heading">FINANCIAL DOCUMENTS</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {NoteshowModel}
      {Tabledisplay}
    </div>
  );
};

export default FinanceDocListing;
