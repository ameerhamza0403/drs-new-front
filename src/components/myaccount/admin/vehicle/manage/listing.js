import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
import EditVehicleManage from "./edit";
import VehicleAddManage from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../scss/override/listing.scss";
import {
  GetListingForVehiclemanage,
  DeleteVehiclemanageDataById
} from "../shared/manage";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Icon2 from '@material-ui/icons/Clear';

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
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
let VehicleManage =()=>{

  let [Atlist, setAtlist] = useState([]);
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
    withFirstAndLast: false,
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
  let PageSizeComp = (
    <select onChange={handlePageSize} value={PageSize}>
      <option selected />
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  let icon=(cell,row)=>{
    let iconvalue =  <i className='fa fa-plus-circle fa-2x' ></i>
    if(cell===true){
        iconvalue =  <i className='fa fa-check-circle fa-2x' ></i>
    }
    else if(cell===false){
        iconvalue =  <i className='fa fa-remove fa-2x' ></i>
    }
    return iconvalue;
}

let iconint=(cell,row)=>{
  let iconvalue =  <i className='fa fa-remove fa-2x' ></i>
  if(cell!==''){
      iconvalue =  <i className='fa fa-remove fa-2x' ></i>
  }
  else{
      iconvalue =  <i className='fa fa-check-circle fa-2x' ></i>
  }
  return iconvalue;
}

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
          pagination
          search
          options={options}
        >
          <TableHeaderColumn dataField="registration" dataSort>
            Registration
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="vehicleGroupName" dataSort>
            Group
          </TableHeaderColumn>
          <TableHeaderColumn dataField="refernce" dataSort>
            Reference
          </TableHeaderColumn>
          <TableHeaderColumn dataField="vehicleTypeName" dataSort>
            Vehicle Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="costPerMile" dataSort>
            Cost Per Mile
          </TableHeaderColumn>
          <TableHeaderColumn dataField="resourceName" dataSort>
            Fixed Staff
          </TableHeaderColumn>
          <TableHeaderColumn dataField="trackingDeviceId"  dataFormat={iconint} dataSort>
            Tracking Device
          </TableHeaderColumn>
          <TableHeaderColumn dataField="usedForJobs" dataFormat={icon} dataSort>
            Used For Jobs
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
        {/* {Atlist.map(e=>e.usedForJobs)} */}
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
  }, []);

  async function getlistapi() {
    await GetListingForVehiclemanage(Page, PageSize).then(res => {
      setAtlist((Atlist = res.data));
      setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    // Atlist.map(
    //   (e, i) =>
    //     (
    //     Atlist[i].trackingDeviceId =iconint(Atlist[i].trackingDeviceId),
    //     Atlist[i].usedForJobs =icon(Atlist[i].usedForJobs)
    //     )
    // );
    TotalPages = paginate.totalPages;
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
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

  //--- Pagination ------------------

  function handlePageSize(event) {
    PageSize = event.target.value;
    refreshfn();
  }

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
              if(Page!=1){
              Page = Page - 1;
              handlepagin();
              }
            }}
          />
        </PaginationItem>
        <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(Page-2!=0){
                  Page = Page - 2;
                  handlepagin();
                  }
                }}
              >
                {/* {Page - 2} */}
                {(Page-2!=0)? Page-2 : '...'}
              </PaginationLink>
            </PaginationItem>
         <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(Page-1!=0){
                  Page = Page - 1;
                  handlepagin();
                  }
                }}
              >
                {/* {Page - 1} */}
                {(Page-1!=0)? Page-1 : '...'}
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
  }
  else if (Page === TotalPages - 1) {
        paging = (
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => {
                  if(Page-1!=0){
                  Page = Page - 1;
                  handlepagin();
                }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(Page-2!=0){
                  Page = Page - 2;
                  handlepagin();
                  }
                }}
              >
                {/* {Page - 2} */}
                {(Page-2!=0)? Page-2 : '...'}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(Page-1!=0){
                  Page = Page - 1;
                  handlepagin();
                  }
                }}
              >
                {/* {Page - 1} */}
                {(Page-1!=0)? Page-1 : '...'}
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
                  if(Page+1<0){
                  Page = Page + 1;
                  handlepagin();
                  }
                }}
              >
                {/* {Page + 1} */}
                {(Page+1<TotalPages)? Page+1 : '...'}
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
                  if(Page-1!=0){
                  Page = Page - 1;
                  handlepagin();
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(Page-1!=0){
                  Page = Page - 1;
                  handlepagin();
                  }
                }}
              >
                {/* {Page - 1} */}
                {(Page-1!=0)? Page-1 : '...'}
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
                  if(!(Page+1>TotalPages)){
                  Page = Page + 1;
                  handlepagin();
                  }
                }}
              >
                {/* {Page + 1} */}
                {(!(Page+1>TotalPages))? Page+1 : '...'}
              </PaginationLink>
            </PaginationItem>
             {/* <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={() => {
                  if(!(Page+2>TotalPages)){
                  Page = Page + 2;
                  handlepagin();
                  }
                }}
              > */}
                {/* {Page + 2}
                {/* {(!(Page+2>TotalPages))? Page+1 : '...'}
              </PaginationLink>
            </PaginationItem> */}
            <PaginationItem>
              <PaginationLink
                next
                tag="button"
                onClick={() => {
                  if(!(Page+1>TotalPages)){
                    Page = Page + 1;
                    handlepagin();
                  }
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
                if(!(Page+1>TotalPages)){
                Page = Page + 1;
                handlepagin();
                }
              }}
            >
              {/* {Page + 1} */}
              {(!(Page+1>TotalPages))? Page+1 : '...'}
            </PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={() => {
                if(!(Page+2>TotalPages)){
                Page = Page + 2;
                handlepagin();
                }
              }}
            > */}
              {/* {Page + 2} */}
              {/* {(!(Page+2>TotalPages))? Page+2 : '...'}
            </PaginationLink>
          </PaginationItem> */}
          <PaginationItem>
            <PaginationLink
              next
              tag="button"
              onClick={() => {
                if(!(Page+2>TotalPages)){
                Page = Page + 1;
                handlepagin();
                }
              }}
            />
          </PaginationItem>
        </Pagination>
      );
    }
  }

  else {
    paging = "";
  }



  //----- Finished Pagination---------

  async function Dellistapi() {
    await DeleteVehiclemanageDataById(idofEdit)
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
      <EditVehicleManage
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
    idofEdit = row.vehicleId;
    return setMenushow((menushow = true));
  };
  let Handlerowclose = (row) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <VehicleAddManage refresh={refreshfn} />
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
        <VehicleAddManage refresh={refreshfn} />
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
          <h3 className="heading">MANAGE VEHICLES</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );

}

export default VehicleManage;
