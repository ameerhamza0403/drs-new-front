import React, { useState, useEffect } from "react";
import "../../../../scss/override/navlisting.scss";
import EditMarkType from "./edit";
import { GetCrmMarkType, DeleteCrmMarkType } from "..//shared/marktype";
import AddMarkMap from "./add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 2;
let screencontent = "";
let menucont = "";

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
  action: {
    cursor: "pointer",
    marginRight: "0"
  }
};

let countforpagination = 0;

let MarkListMapListing = props => {
  let [Atlist, setAtlist] = useState([]);
  let [paginate, setPaginate] = useState();
  let [totalcount, setTotalCount] = useState();

  //-- React Data Table
  const options = {
    sortIndicator: true,
    // page: Page,
    hideSizePerPage: true,
    // paginationSize: PageSize,
    hidePageListOnlyOnePage: true,
    // sizePerPage: PageSize,
    // clearSearch: true,
    alwaysShowAllBtns: false,
    // onRowClick: HandlerowSelect,
    withFirstAndLast: false
    // onPageChange: onPageChange,
    // onSizePerPageList: sizePerPageListChange,
  };

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

  let Tabledisplay = (
    <div style={classes.linearprogress}>
      <Spinner type="grow" color="dark" />
    </div>
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <div>
        <BootstrapTable
          headerStyle={{ background: "#DDDDDD", maxHeight: "40px" }}
          data={Atlist}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
        >
          <TableHeaderColumn
            isKey={true}
            hidden={true}
            dataField="marketingCampaignName"
            dataSort
          >
            MarketingCampaignTypeId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="marketingCampaignName" dataSort>
            Campaign
          </TableHeaderColumn>
          <TableHeaderColumn dataField="marketingListName" dataSort>
            Marketing List
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            dataField="marketingCampaignTypeId"
            dataSort={false}
            width="6%"
            dataFormat={handleaction}
          ></TableHeaderColumn> */}
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
    await GetCrmMarkType(Page, PageSize).then(res => {
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
    return toast.success("Successfull... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function handleaction(cell) {
    return (
      <div>
        <i
          className="fa fa-pencil-square-o"
          style={classes.action}
          title={"Edit"}
          onClick={() => Editfn(cell)}
        ></i>
        &nbsp; &nbsp;
        <i
          className="fa fa-close 1x"
          style={classes.action}
          title={"Delete"}
          onClick={() => Dellistapi(cell)}
        ></i>
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
        <AddMarkMap
          backmain={ChangeScreen}
          success={success}
          error={errort}
          open={true}
        />
      );
      break;
    case 3:
      screencontent = (
        <EditMarkType
          backmain={ChangeScreen}
          success={success}
          error={errort}
          IDforAPI={idofEdit}
          open={true}
        />
      );
      break;
  }

  async function Dellistapi(id) {
    await DeleteCrmMarkType(id)
      .then(() => {
        success();
      })
      .catch(error => {
        errort();
      });
    // Handlerowclose();
    refreshfn();
  }

  function Editfn(cell) {
    idofEdit = cell;
    return setScreen(3);
  }

  menuDiv = (
    <li>
      <i
        className="fa fa-plus-circle fa-2x"
        style={{ color: "white", cursor: "pointer" }}
        title={"Add New"}
        onClick={() => {
          setScreen(2);
        }}
      />
      {/* <AddCrmLead refresh={refreshfn} /> */}
    </li>
  );
  let [menucon, setMenucon] = useState(true);
  if (menucon) {
    menucont = (
      <div className="row align-items-center justify-content-between headbtn">
        <div className="headbtn-icons col-md-12 col-lg-2">{menuDiv}</div>
        <div className="headbtn-links col-md-12 col-lg-10">
        <div
            className="btn btn-active"
          >
            Assign Campaign
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("contacts");
            }}
          >
            Contacts
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("contact-person");
            }}
          >
            Person
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("notes");
            }}
          >
            Notes
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("leads");
            }}
          >
            Leads
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("note-activity");
            }}
          >
            Activities
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("");
            }}
          >
            Mail
          </div>
          <div
            className="btn"
            onClick={() => {
              props.history.push("");
            }}
          >
            Sale Oppurtunity
          </div>
        </div>
        {/* <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">CONTACT PERSON</h3>
        </div> */}
      </div>
    );
  } else {
    menucont = "";
  }
  return (
    <div>
      {menucont}
      <br />
      {screencontent}
      <br />
    </div>
  );
};

export default withRouter(MarkListMapListing);
