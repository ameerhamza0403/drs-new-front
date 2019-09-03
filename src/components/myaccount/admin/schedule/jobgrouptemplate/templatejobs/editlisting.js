import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../../../../scss/override/listing.scss";
import MaterialTable from "material-table";
// import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { JobGroupType } from "../../shared/jobgrouptemplate";
import { GetListingpgForResource } from "../../../resources/shared/addedit";
import {GetListforlistunderedit} from '../../shared/jobgrouptemplate';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

let menuDiv = "";
let EditshowModel = "";
let idofEdit = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 2;
let jobtype = [];
let resourcetype = [];

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


let tabledata=[{}];

let EditGroupTemplate = (props) => {
  let [Atlist, setAtlist] = useState([
    { name: "", sameContact: true, sameResource: true, isActive: true }
  ]);
  let [paginate, setPaginate] = useState();


  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

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

  let [job, setJob] = useState([
    {
      jobTypeId: 0,
      name: "test"
    }
  ]);
  let [resource, setResource] = useState([
    {
      resourceId: 0,
      name: "string"
    }
  ]);

  useEffect(() => {
    getinitiallist();
  }, []);


  async function getinitiallist() {
    const {data : Atlist} = await GetListforlistunderedit(props.id);
    setAtlist(Atlist);
    const { data: Job } = await JobGroupType();
    setJob(Job);
    const { data: resource } = await GetListingpgForResource(0,0);
    setResource(resource);

    Job.map(e => {
      jobtype[e.jobTypeId] = e.name;
    });
    resource.map(e => {
      resourcetype[e.resourceId] = e.name;
    });

    console.log(Atlist);
    Atlist.map((e,i)=>{
      tabledata[i].name=e.jobTypeId;
      tabledata[i].namecon=e.contact;
      tabledata[i].namres=e.resourceId;
    })
    settabledistatus(true);
  }

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Job Type",
        field: "name",
        lookup: jobtype
      },
      { title: "Contact", field: "namecon" },
      {
        title: "Resources",
        field: "namres",
        lookup: resourcetype
      }
    ],
    data: tabledata
      // [
        // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      // {
      //   name: 'Zerya Betül',
      //   surname: 'Baran',
      //   birthYear: 2017,
      //   birthCity: 34,
      // },]

  });



  if (Tabledistatus) {
    Tabledisplay = (
      // <MUIDataTable
      //   title={"Actions & Filters"}
      //   data={Atlist}
      //   columns={columns}
      //   options={options}
      // />
      <div>
        <MaterialTable
          title="Editable Example"
          columns={state.columns}
          icons={tableIcons}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  props.templatedata(data)
                  setState({ ...state, data });
                }, 600);
              },
              )

              // props.templatedata(state.data)
              ,
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  props.templatedata(data)
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  props.templatedata(data)
                  setState({ ...state, data });
                }, 600);
              })
          }}
        />
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
    settabledistatus((Tabledistatus = false));
    // getlistapi();
  };

  // useEffect(() => {
  //   getlistapi();
  // }, []);

  // async function getlistapi() {
  //   await GetListingForjobgrouptemplate(Page, PageSize).then(res => {
  //     setAtlist((Atlist = res.data));
  //     setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
  //   });
  //   // Atlist.map((e,i)=>
  //   //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

  //   //                 )
  //   TotalPages = paginate.totalPages;
  //   settabledistatus((Tabledistatus = true));
  // }
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
    // if (Page > 2 || Page === 2) {
    //   if (Page === TotalPages) {
    paging = (
      <Pagination>
        <PaginationItem>
          <PaginationLink
            previous
            tag="button"
            onClick={() => {
              if (Page - 1 > 0) {
                Page = Page - 1;
                handlepagin();
              }
            }}
          />
        </PaginationItem>
        {/* <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={() => {
                if(Page-2>0){
                Page = Page - 2;
                handlepagin();
                }
              }}
            >

              {(Page-2>0)? Page-2 : '...'}
            </PaginationLink>
          </PaginationItem> */}
        <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => {
              if (Page - 1 > 0) {
                Page = Page - 1;
                handlepagin();
              }
            }}
          >
            {/* {Page - 1} */}
            {Page - 1 > 0 ? Page - 1 : "..."}
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
              if (Page + 1 < TotalPages || Page + 1 === TotalPages) {
                Page = Page + 1;
                handlepagin();
              }
            }}
          >
            {/* {Page - 1} */}
            {Page + 1 === TotalPages || Page + 1 < TotalPages
              ? Page + 1
              : "..."}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            next
            tag="button"
            onClick={() => {
              if (Page + 1 < TotalPages || Page + 1 === TotalPages) {
                Page = Page + 1;
                handlepagin();
              }
            }}
          />
        </PaginationItem>
      </Pagination>
    );
    // }
    // else if (Page === TotalPages - 1) {
    //       paging = (
    //         <Pagination>
    //           <PaginationItem>
    //             <PaginationLink
    //               previous
    //               tag="button"
    //               onClick={() => {
    //                 if(Page-1!=0){
    //                 Page = Page - 1;
    //                 handlepagin();
    //               }
    //               }}
    //             />
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(Page-2!=0){
    //                 Page = Page - 2;
    //                 handlepagin();
    //                 }
    //               }}
    //             >
    //               {/* {Page - 2} */}
    //               {(Page-2!=0)? Page-2 : '...'}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(Page-1!=0){
    //                 Page = Page - 1;
    //                 handlepagin();
    //                 }
    //               }}
    //             >
    //               {/* {Page - 1} */}
    //               {(Page-1!=0)? Page-1 : '...'}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               // onClick={() => {
    //               //   Page = Page+1;
    //               //   handlepagin();

    //               // }}
    //             >
    //               {Page}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(Page+1<0){
    //                 Page = Page + 1;
    //                 handlepagin();
    //                 }
    //               }}
    //             >
    //               {/* {Page + 1} */}
    //               {(Page+1<TotalPages)? Page+1 : '...'}
    //             </PaginationLink>
    //           </PaginationItem>
    //         </Pagination>
    //       );
    //     } else {
    //       paging = (
    //         <Pagination>
    //           <PaginationItem>
    //             <PaginationLink
    //               previous
    //               tag="button"
    //               onClick={() => {
    //                 if(Page-1!=0){
    //                 Page = Page - 1;
    //                 handlepagin();
    //                 }
    //               }}
    //             />
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(Page-1!=0){
    //                 Page = Page - 1;
    //                 handlepagin();
    //                 }
    //               }}
    //             >
    //               {/* {Page - 1} */}
    //               {(Page-1!=0)? Page-1 : '...'}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 Page = Page;
    //                 handlepagin();
    //               }}
    //             >
    //               {Page}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(!(Page+1>TotalPages)){
    //                 Page = Page + 1;
    //                 handlepagin();
    //                 }
    //               }}
    //             >
    //               {/* {Page + 1} */}
    //               {(!(Page+1>TotalPages))? Page+1 : '...'}
    //             </PaginationLink>
    //           </PaginationItem>
    //            {/* <PaginationItem>
    //             <PaginationLink
    //               tag="button"
    //               onClick={() => {
    //                 if(!(Page+2>TotalPages)){
    //                 Page = Page + 2;
    //                 handlepagin();
    //                 }
    //               }}
    //             > */}
    //               {/* {Page + 2}
    //               {/* {(!(Page+2>TotalPages))? Page+1 : '...'}
    //             </PaginationLink>
    //           </PaginationItem> */}
    //           <PaginationItem>
    //             <PaginationLink
    //               next
    //               tag="button"
    //               onClick={() => {
    //                 if(!(Page+1>TotalPages)){
    //                   Page = Page + 1;
    //                   handlepagin();
    //                 }
    //               }}
    //             />
    //           </PaginationItem>
    //         </Pagination>
    //       );
    //     }
    //   } else if (Page < 2) {
    //     paging = (
    //       <Pagination>
    //         <PaginationItem>
    //           <PaginationLink
    //             tag="button"
    //             onClick={() => {
    //               Page = Page;
    //               handlepagin();
    //             }}
    //           >
    //             {Page}
    //           </PaginationLink>
    //         </PaginationItem>
    //         <PaginationItem>
    //           <PaginationLink
    //             tag="button"
    //             onClick={() => {
    //               if(!(Page+1>TotalPages)){
    //               Page = Page + 1;
    //               handlepagin();
    //               }
    //             }}
    //           >
    //             {/* {Page + 1} */}
    //             {(!(Page+1>TotalPages))? Page+1 : '...'}
    //           </PaginationLink>
    //         </PaginationItem>
    //         {/* <PaginationItem>
    //           <PaginationLink
    //             tag="button"
    //             onClick={() => {
    //               if(!(Page+2>TotalPages)){
    //               Page = Page + 2;
    //               handlepagin();
    //               }
    //             }}
    //           > */}
    //             {/* {Page + 2} */}
    //             {/* {(!(Page+2>TotalPages))? Page+2 : '...'}
    //           </PaginationLink>
    //         </PaginationItem> */}
    //         <PaginationItem>
    //           <PaginationLink
    //             next
    //             tag="button"
    //             onClick={() => {
    //               if(!(Page+1>TotalPages)){
    //               Page = Page + 1;
    //               handlepagin();
    //               }
    //             }}
    //           />
    //         </PaginationItem>
    //       </Pagination>
    //     );
    //   }
  } else {
    paging = "";
  }

  //----- Finished Pagination---------

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
    // await DeletejobgrouptemplateDataById(idofEdit)
    //   .then(() => {
    //     success();
    //   })
    //   .catch(error => {
    //     errort();
    //   });
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
      <div></div>
      // <JobGroupTemplateEdit
      //   IDforAPI={idofEdit}
      //   refresh={refreshfn}
      //   cross={HandleCrossEditforlisting}
      // />
    );
  } else {
    EditshowModel = "";
  }

  let [menushow, setMenushow] = useState(false);
  function HandlerowSelect(row) {
    menuDiv = "";
    idofEdit = row.jobGroupTemplateId;
    console.log(idofEdit);
    return setMenushow((menushow = true));
  }
  let Handlerowclose = row => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li> {/* <JobGroupTemplateAdd refresh={refreshfn} />{" "} */}</li>
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
          <h3 className="heading">TEMPLATE JOBS</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default EditGroupTemplate;
