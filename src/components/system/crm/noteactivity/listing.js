import React, { useState, useEffect } from "react";
//import MUIDataTable from "mui-datatables";
import "../../../../scss/override/listing.scss";
import EditNotes from "./edit";
import {
  GetCrmNotesActivity,
  DeleteCrmNotesActivity
} from "..//shared/notesactivity";
import AddNotesActivity from "./add";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {GetActivitiesByNoteApi} from '../shared/notes';

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

let ListingNoteActivty = props => {
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
    console.log(props.idofParent)
    if (props.callid) {
      if(props.ActivityType==='notes'){
        await GetActivitiesByNoteApi(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log(res.data);
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }
      else if(props.ActivityType==='resource'){
        await GetCrmNotesActivity(props.idofParent).then(res => {
          setAtlistVal((AtlistVal = res.data));
          console.log(res.data);
        });
        settabledistatus((Tabledistatus = false));
        settabledistatus((Tabledistatus = true));
        setMenucon(props.Showhead);
      }

    } else {
      await GetCrmNotesActivity(Page, PageSize).then(res => {
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
          headerStyle={ { background: '#DDDDDD', maxHeight:'40px', } }
          data={AtlistVal}
          version="4"
          striped
          hover
          // pagination
          // search
          options={options}
          // cellEdit={cellEditProp}
        >
          <TableHeaderColumn dataField="dueDate" dataSort dataFormat={datefn}>
            Due Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="activityTypeName" dataSort>
            Activity Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="user" dataSort>
            Web User
          </TableHeaderColumn>
          <TableHeaderColumn dataField="comment" dataSort>
            Comment
          </TableHeaderColumn>
          <TableHeaderColumn dataField="progress" dataSort>
            Progress
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
            dataField="activityId"
            dataSort={false}
            width={(props.Showhead)?'6%':''}
            dataFormat={handleaction}
          ></TableHeaderColumn>
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

  function datefn(cell){
    if (!((cell === null)||(cell === undefined))) {
      return cell.substr(0, cell.length - 9);
  }
  else{
    return ' - '
  }
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
        <AddNotesActivity
          backmain={ChangeScreen}
          success={success}
          error={errort}
          ActivityType={props.ActivityType}
          idofParent={props.idofParent}
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
    await DeleteCrmNotesActivity(id)
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
      {/* <AddNotesActivity refresh={refreshfn} /> */}
    </ul>
  );

  if (menucon) {
    menucont = (
      <div className="row header">
        <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-5">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">ACTIVITIES</h3>
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

export default ListingNoteActivty;
