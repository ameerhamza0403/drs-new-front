import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
// import JobGroupTemplateEdit from "./edit";
// import JobGroupTemplateAdd from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../scss/override/listing.scss";
import {} from '../shared/docnsale';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {GetAllListingForFinancialDocumentnSale} from '../shared/docnsale';

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
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

let menuselected='';
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
          <TableHeaderColumn dataField="isActive" isKey={true} hidden={true}>
            isActive
          </TableHeaderColumn>

          <TableHeaderColumn dataField="name" dataSort>
            Document Type
          </TableHeaderColumn>
        </BootstrapTable>
        <br />
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
    await GetAllListingForFinancialDocumentnSale(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
    TotalPages = paginate.totalPages;
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
    await DeletejobgrouptemplateDataById(idofEdit)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    Handlerowclose();
    refreshfn();
  }



  let [autoref, setAutoref] = React.useState(false);
  let HandleAutoref = () => {
    return (
      setAutoref((autoref = !autoref)),
      HandlecloseAutoref()
      // handleMenuClose()
    );
  };

  let HandlecloseAutoref = () => {
    setAutoref((autoref = false));
  };

  if (autoref) {
    EditshowModel = (
      <DocnSaleAuto
        IDforAPI={idofEdit}
        refresh={refreshfn}
        cross={HandleCrossEditforlisting}
      />
    );
  } else {
    EditshowModel = "";
  }


  let [notes, setNotes] = React.useState(false);
  let HandleNotes = () => {
    return (
      setNotes((notes = !notes)),
      handleclosenotes()
      // handleMenuClose()
    );
  };

  let handleclosenotes = () => {
    setNotes((notes = false));
  };

  if (notes) {
    EditshowModel = (
      <DocnSaleAuto
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
    idofEdit = row.jobGroupTemplateId;
    console.log(idofEdit);
    menuselected=row.name;
    return setMenushow((menushow = true));
  }
  let Handlerowclose = row => {
    return setMenushow((menushow = false));
  };


  if (menushow) {
    if(menuselected==='Application for payment'|| menuselected==='Delivery note'|| menuselected==='Credit note' || menuselected==='Proforma invoice'||menuselected==='Invoice'){
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title='Automatic Reference' onClick={HandleAutoref}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          <li title='Notes to Clients' onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
          </li>
          <li onClick={Handlerowclose}>
            &nbsp;&nbsp;
            <i className="fa fa-times-rectangle fa-2x" />
          </li>
        </ul>
      );
    }
    else if(menuselected==='Sales Opportunity'){
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title='Automatic Reference' onClick={HandleAutoref}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          {/* <li title='Notes to Clients' onClick={HandleAutoref}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
          </li> */}
          <li onClick={Handlerowclose}>
            &nbsp;&nbsp;
            <i className="fa fa-times-rectangle fa-2x" />
          </li>
        </ul>
      );
    }
    else if(menuselected==='Quotation'){
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title='Automatic Reference' onClick={HandleAutoref}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          <li title='Notes to Clients' onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
          </li>
          {/* <li title='Quote Acceptance' onClick={HandleAutoref}>
            &nbsp;&nbsp;
            <i className="fa fa-pencil fa-2x" />
          </li> */}
          <li onClick={Handlerowclose}>
            &nbsp;&nbsp;
            <i className="fa fa-times-rectangle fa-2x" />
          </li>
        </ul>
      );
    }
    else if(menuselected==='Purchase order'){
      menuDiv = (
        <ul className="tool">
          {/* <li>
            <JobGroupTemplateAdd refresh={refreshfn} />{" "}
          </li> */}
          <li title='Automatic Reference' onClick={HandleAutoref}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-registered fa-2x" />
          </li>
          {/* <li title='Series' onClick={HandleAutoref}>
            &nbsp;&nbsp;
            <i className="fa fa-calculator fa-2x" />
          </li> */}
          <li title='Notes to Clients' onClick={HandleNotes}>
            &nbsp;&nbsp;
            <i className="fa fa-sticky-note fa-2x" />
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
        <li />
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
      {Tabledisplay}
    </div>
  );
};

export default FinanceDocListing;
