import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// import MUIDataTable from "mui-datatables";
// import JobGroupTemplateEdit from "./edit";
// import JobGroupTemplateAdd from "./add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../../scss/override/listing.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {GetFinancialDocumentnSaleDataById, DeleteFinancialDocumentnSaleDataById} from '../../shared/docnsale';
import AddNote from './add';

let menuDiv = "";
// let EditshowModel = "";
// let NoteshowModel = "";
let idofEdit = 0;
let Page = 1;
let PageSize = 10;
let paging = "";
let TotalPages = 2;
let arrforatlist=[];

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

let NotestoClient = (props) => {
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
          headerStyle={ { background: '#DDDDDD', maxHeight:'40px', } }
          data={arrforatlist}
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
          <TableHeaderColumn dataField="label" dataSort>
            Label
          </TableHeaderColumn>
          <TableHeaderColumn dataField="notes" dataSort>
            Notes
          </TableHeaderColumn>
        </BootstrapTable>
        <br />
        {/* <div className="row">
          <div className="col">
            {PageSizeComp}
            {"  Showing " + PageSize + " Rows Per Page"}
          </div>
          <div className="col">{paging}</div>
        </div> */}
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
    await GetFinancialDocumentnSaleDataById(props.IDforAPI).then(res => {
      setAtlist((Atlist = res.data));
      console.log(Atlist)
      arrforatlist.push(Atlist);
      // setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
    });
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
    // TotalPages = paginate.totalPages;
    settabledistatus((Tabledistatus = true));
  }


  //--- Pagination ------------------

  // let [pgin, setPgin] = useState(true);

  // function handlepagin() {
  //   setPgin(false);
  //   // setTimeout(() => setPgin(true), 10);
  //   refreshfn();
  //   setPgin(true);
  // }

  // if (pgin) {
  //   if (Page > 2 || Page === 2) {
  //     if (Page === TotalPages) {
  //       paging = (
  //         <Pagination>
  //           <PaginationItem>
  //             <PaginationLink
  //               previous
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             />
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 2;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page - 2}
  //             </PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page - 1}
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
  //         </Pagination>
  //       );
  //     } else if (Page === TotalPages - 1) {
  //       paging = (
  //         <Pagination>
  //           <PaginationItem>
  //             <PaginationLink
  //               previous
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             />
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 2;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page - 2}
  //             </PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page - 1}
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
  //                 Page = Page + 1;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page + 1}
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
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             />
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page - 1;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page - 1}
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
  //                 Page = Page + 1;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page + 1}
  //             </PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page + 2;
  //                 handlepagin();
  //               }}
  //             >
  //               {Page + 2}
  //             </PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink
  //               next
  //               tag="button"
  //               onClick={() => {
  //                 Page = Page + 1;
  //                 handlepagin();
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
  //               Page = Page + 1;
  //               handlepagin();
  //             }}
  //           >
  //             {Page + 1}
  //           </PaginationLink>
  //         </PaginationItem>
  //         <PaginationItem>
  //           <PaginationLink
  //             tag="button"
  //             onClick={() => {
  //               Page = Page + 2;
  //               handlepagin();
  //             }}
  //           >
  //             {Page + 2}
  //           </PaginationLink>
  //         </PaginationItem>
  //         <PaginationItem>
  //           <PaginationLink
  //             next
  //             tag="button"
  //             onClick={() => {
  //               Page = Page + 1;
  //               handlepagin();
  //             }}
  //           />
  //         </PaginationItem>
  //       </Pagination>
  //     );
  //   }
  // } else {
  //   paging = "";
  // }
  // function handlePageSize(event) {
  //   PageSize = event.target.value;
  //   refreshfn();
  // }



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


  // let [Editstate, setEditstate] = React.useState(false);
  // let HandleEditforlisting = () => {
  //   return (
  //     setEditstate((Editstate = !Editstate)),
  //     Handlerowclose()
  //     // handleMenuClose()
  //   );
  // };

  // let HandleCrossEditforlisting = () => {
  //   return setEditstate((Editstate = false));
  // };

  // if (Editstate) {
  //   EditshowModel = (
  //     <EditNoteType
  //       IDforAPI={idofEdit}
  //       refresh={refreshfn}
  //       cross={HandleCrossEditforlisting}
  //     />
  //   );
  // } else {
  //   EditshowModel = "";
  // }

  let [add, setAdd] = React.useState(false);
  let HandleAdd = () => {
    return (
      setAdd((add = !add)),
      // handleclosenotes()
      handleMenuClose()
    );
  };

  let handleMenuClose =()=>{
    setMenushow(false);
  }

  let handlecloseadd = () => {
    return setAdd((add = false));
  };

  let [menushow, setMenushow] = useState(false);
  let HandlerowSelect = (data, meta) => {
    menuDiv = "";
    idofEdit = data[0];
    return setMenushow((menushow = true));
  };
  let Handlerowclose = (data, meta) => {
    return setMenushow((menushow = false));
  };
  if (menushow) {
    menuDiv = (
      <ul className="tool">
        <li>
          <AddNote refresh={refreshfn} cross={handlecloseadd} id={props.IDforAPI}/>
        </li>
        {/* <li onClick={HandleEditforlisting}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-pencil-square fa-2x" />
        </li> */}
        {/* <li onClick={Dellistapi}>
          &nbsp;&nbsp;
          <i className="fa fa-archive fa-2x" />
        </li>
        <li onClick={Handlerowclose}>
          &nbsp;&nbsp;
          <i className="fa fa-times-rectangle fa-2x" />
        </li> */}
      </ul>
    );
  } else if (!menushow) {
    menuDiv = (
      <ul className="tool">
        <li />
        <AddNote refresh={refreshfn} cross={handlecloseadd} id={props.IDforAPI}/>
      </ul>
    );
  }


  let [modalN, setModalN] = useState(true);

  let handleOpen = () => {
    return setModalN((modalN = !modalN)), setTimeout(() => props.cross(), 200);
  };


  return (
    <div>

      <Modal
        isOpen={modalN}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
      >
        <ModalHeader toggle={handleOpen}>NOTES TO CLIENT</ModalHeader>
        <ModalBody>
          <div className="container">
          <div>
      <div className="row header">
        <div className="col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2">
          {menuDiv}
        </div>
        <div className="col-12 col-sm-6 col-md-7 col-lg-7 col-xl-7">
          <h3 className="heading">NOTES TO CLIENT</h3>
        </div>
      </div>
      <br />
      {/* {EditshowModel} */}
      {Tabledisplay}
    </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NotestoClient;
