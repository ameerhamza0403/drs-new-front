import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import EditButtonForJobFlag from "./edit";
import {
  GetListingForJobflag,
  DeleteJobflagDataById
} from "..//shared/jobflag";
import AddJobFlag from "./add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Spinner } from "reactstrap";

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
let JobFlagListing = () => {
  let [totalcount, setTotalCount] = useState();

  let ColorStyleFn = mycolor => {
    let code = "#" + mycolor;
    return (ColorStyle = {
      background: code
    });
  };
  let [paginate, setPaginate] = useState();

  let [Atlist, setAtlist] = useState([
    {
      colorCode: "",
      name: ""
    }
  ]);

  // const columns = [
  //   {
  //     name: "jobFlagId",
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
  //     name: "colorCode",
  //     label: "Color",
  //     options: {
  //       filter: false,
  //       sort: false
  //     }
  //   }
  // ];

  // const options = {
  //   filterType: "multiselect",
  //   onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
  //   // onChangePage: (currentPage)=> handlechangepage(currentPage),
  //   // onChangeRowsPerPage: (numberOfRows)=> handlechangepagesize(numberOfRows),
  //   // rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
  //   customFooter: () => "",
  //   selectableRows: "none",
  //   viewColumns: true,
  //   rowsPerPage: PageSize,
  //   responsive: "scroll"
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  // };

  let [colorarr, setcolorarr]= useState();
  let [c,setc]=useState();


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

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
        <MUIDataTable
          title={"Actions & Filters"}
          data={Atlist}
          columns={columns}
          options={options}
        />
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
        <BootstrapTable
          data={Atlist}
          version="4"
          striped
          hover
          pagination
          search
          options={options}
        >
          <TableHeaderColumn dataField="name" dataSort>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="colorCode" dataFormat={colorinit} dataSort>
            Colour
          </TableHeaderColumn>
          <TableHeaderColumn dataField="isActive" hidden={true} isKey={true} dataSort>
            Name
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
    // settabledistatus((Tabledistatus = false));
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
    await GetListingForJobflag(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      // Atlist.map(
      //   (e, i) =>
      //     (Atlist[i].colour = (
      //       <div className="ColorCodesl" style={ColorStyleFn(e.colour)} />
      //     ))
      // );
      console.log(Atlist)
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    TotalPages = paginate.totalPages;
    settabledistatus((Tabledistatus = false));
    settabledistatus((Tabledistatus = true));
  }

  let colorinit=(cell,row)=>{
    console.log(c);
    let colorvalue =  <div className="ColorCodesl" style={ColorStyleFn(cell)} />

    return colorvalue;
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
    await DeleteJobflagDataById(idofEdit)
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
      <EditButtonForJobFlag
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
    idofEdit = row.jobFlagId;
    console.log(idofEdit);
    return setMenushow((menushow = true));
  };
  let Handlerowclose = (data, meta) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <AddJobFlag refresh={refreshfn} />
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
        <AddJobFlag refresh={refreshfn} />
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
          <h3 className="heading">JOB FLAG</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default JobFlagListing;
