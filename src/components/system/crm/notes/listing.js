import React, { useState, useEffect } from "react";
//import MUIDataTable from "mui-datatables";
import "../../../../scss/override/listing.scss";
import EditNotes from "./edit";
import {
  GetCrmNotes,
  DeleteCrmNotes,
  GetCrmNotesByContact,
  GetNoteByParentNoteApi,
  GetActivitiesByNoteApi,
  GetNoteByPersonId
} from "..//shared/notes";
import AddNotes from "./add";
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
let menucont = "";
let footcont = "";

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

let ListingNotes = props => {
  let [AtlistVal, setAtlistVal] = useState();
  let [paginate, setPaginate] = useState();
  let [totalcount, setTotalCount] = useState();
  let [menucon, setMenucon] = useState(false);

  //-- React Data Table
  const options = {
    sortIndicator: true,
    // page: Page,
    hideSizePerPage: true,
    // paginationSize: 5,
    // hidePageListOnlyOnePage: false,
    // clearSearch: true,
    alwaysShowAllBtns: false,
    // onRowClick: HandlerowSelect,
    withFirstAndLast: false

    // onPageChange: onPageChange,
    // onSizePerPageList: sizePerPageListChange
  };

  useEffect(() => {
    getlistapi();
  }, []);

  async function getlistapi() {
    if (props.callid) {
      if (props.noteType === "contact") {
        await GetCrmNotesByContact(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('contact');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }
      else if (props.noteType === "person") {
        await GetNoteByPersonId(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('person');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }
      else if (props.noteType === "notes") {
        await GetNoteByParentNoteApi(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('notes');
          console.log(AtlistVal)
          console.log(props.idofParent)
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }
      // else if (props.noteType === "activities") {
      //   await GetActivitiesByNoteApi(props.idofParent).then(res => {
      //     setAtlistVal((AtlistVal = res.data));
      //     console.log('activities');
      //     console.log(AtlistVal)
      //     console.log(props.idofParent)
      //   });
      //   settabledistatus((Tabledistatus = false));
      //   settabledistatus((Tabledistatus = true));
      //   setMenucon(props.Showhead);
      // }
      else if (props.noteType === "vehicle") {
        await GetCrmNotesByContact(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('vehicle');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }

      else if (props.noteType === "resource") {
        await GetCrmNotesByContact(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('resource');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }

      else if (props.noteType === "customerasset") {
        await GetCrmNotesByContact(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('customerasset');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }

      else if (props.noteType === "item") {
        await GetCrmNotesByContact(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log('item');
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }

    } else {
      await GetCrmNotes(Page, PageSize).then(res => {
        setAtlistVal((AtlistVal = res.data));
        console.log(res.data);
        setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
      });

      // AtlistVal.map(e => {
      //   if (!(e.installDate === null)) {
      //     e.installDate = e.installDate.substr(0, e.installDate.length - 9);
      //   }
      // });

      setTotalCount((totalcount = paginate.totalCount));
      TotalPages = paginate.totalPages;
      countforpagination = 0;
      settabledistatus((Tabledistatus = false));
      settabledistatus((Tabledistatus = true));
      setMenucon(props.Showhead);
    }
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
          headerStyle={{ background: "#DDDDDD", maxHeight: "40px" }}
          data={AtlistVal}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
          // cellEdit={cellEditProp}
        >
          <TableHeaderColumn dataField="noteType" dataSort>
            Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="notes" dataSort>
            Notes
          </TableHeaderColumn>
          <TableHeaderColumn dataField="reference" dataSort>
            Reference
          </TableHeaderColumn>
          <TableHeaderColumn dataField="noteOwner" dataSort>
            Note Owner
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="dueDate" dataSort dataFormat={datefn}>
            Due Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="isActive"
            hidden={true}
            isKey={true}
            dataSort
          >
            isActive
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="noteId"
            dataSort={false}
            width={props.Showhead ? "6%" : ""}
            dataFormat={handleaction}
          ></TableHeaderColumn>
        </BootstrapTable>
        <br />
        {/* <div className="row">
          <div className="col-6 col-sm-4 col-md-8 col-lg-9 col-xl-10">
            {"  Showing "} {PageSizeComp} {" Results"}
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            {paging}
          </div>
        </div> */}
      </div>
    );
  } else {
    Tabledisplay = (
      <div style={classes.linearprogress}>
        <Spinner type="grow" color="dark" />
      </div>
    );
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

  function datefn(cell) {
    if (!(cell === null || cell === undefined)) {
      return cell.substr(0, cell.length - 9);
    } else {
      return " - ";
    }
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
        <AddNotes
          backmain={ChangeScreen}
          success={success}
          error={errort}
          noteType={props.noteType}
          check={props.callid}
          idforparent={props.idofParent}
        />
      );
      break;
    case 3:
      screencontent = (
        <EditNotes
          backmain={ChangeScreen}
          success={success}
          error={errort}
          IDforAPI={idofEdit}
          noteType={props.noteType}
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

  async function Dellistapi(id) {
    await DeleteCrmNotes(id)
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

  if (props.ShowFoot) {
    footcont = (
      <div
        hidden={screen === 2 ? true : false}
        className="col-12"
        style={{ textAlign: "center" }}
      >
        {" "}
        <i
          className="fa fa-plus fa-3x"
          style={{ color: "#EE7647" }}
          title={"Add New"}
          onClick={() => {
            setScreen(2);
          }}
        />
      </div>
    );
  } else {
    footcont = "";
  }
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
      {/* <AddNotes refresh={refreshfn} /> */}
    </ul>
  );

  if (menucon) {
    menucont = (
      <div className="row header">
        <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-5">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">NOTES</h3>
        </div>
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
      <div className="row">{footcont}</div>
      <br />
      <br />
    </div>
  );
};

export default ListingNotes;
