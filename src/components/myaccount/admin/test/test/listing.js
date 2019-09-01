import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import "../../../../../scss/override/listing.scss";
//import EditButtonForJobCategory from "./edit";
import {
  GetListingForJobcategory,
  DeleteJobcategoryDataById
} from "../../schedule/shared/jobcategory";
import {GetListingForWorkSheet} from "../../schedule/shared/worksheet";

import LinearProgress from "@material-ui/core/LinearProgress";
//import AddJobCategory from "./add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let menuDiv = "";
let EditshowModel = "";
let ColorStyle = {};
let idofEdit = 0;
let count = 0;
let Page = 0;
let PageSize = 0;
let questionworksheet=[];
let name2=[];
let visiblity2=[];

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

let TestListing = () => {
  let [Atlist, setAtlist] = useState([
    {
      visiblity: "",
      name: ""
    }
  ]);

  const columns = [
    {
      name: "jobCategoryId",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "visiblity",
      label: "Visiblity",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "isActive",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        display: false
      }
    }
  ];

  const options = {
    filterType: "multiselect",
    onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
    // onChangePage: (currentPage)=> handlechangepage(currentPage),
    // onChangeRowsPerPage: (numberOfRows)=> handlechangepagesize(numberOfRows),
    rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
    selectableRows: "none",
    viewColumns: true
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
  };

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

  let [worksheet, setworksheet] = useState([
    {
      worksheetId:0,
      name: ""
    },
  ]);

  let [cat, setcat] = useState([
    {
      jobCategoryId:0,
      name: "",
      visiblity:"",
    },
  ]);

  let [cat1, setcat1] = useState([
    {
      jobCategoryId:0,
      name: "",
      visiblity:"",
    },
  ]);
  

  useEffect(() => {
    getinitiallist();
  }, []);

  async function getinitiallist() {
    
    await GetListingForWorkSheet(0, 0).then(res => {
    // console.log(props.idofquestion);
    setworksheet((worksheet = res.data));
    
    });

    await GetListingForJobcategory(0, 0).then(res => {
      // console.log(props.idofquestion);
      setcat((cat = res.data));
      
      });

      await GetListingForJobcategory(0, 0).then(res => {
        // console.log(props.idofquestion);
        setcat1((cat1 = res.data));
        
        });
    
     (worksheet.map(e => (
      questionworksheet[e.worksheetId]=e.name
      )));


        // (cat1.map(e => (
        //   visiblity2[e.jobCategoryId]=e.visiblity
        //   )));
          (cat.map(e => (
            name2[e.jobCategoryId]=e.name
            )));

            console.log(name2)
      // questionworksheet[1]="adnan";
      // questionworksheet[2]="ham";

      console.log(worksheet)
      console.log(questionworksheet);

    

    return setMenushow((menushow = true));
                        
  }

  
    const [state, setState] = React.useState({
      columns: [
        { title: 'Name', field: 'name'},
        { title: 'Visibilty', field: 'visiblity'},
        
        {
          title: 'Worksheet',
          field: 'WorksheetName',
          lookup:  questionworksheet ,
        },
      ],
      data: [
        { name: 1, visiblity: 2, WorksheetName: 1 },
        
      ],
    });

  let Tabledisplay = (
    <LinearProgress style={classes.linearprogress} color="secondary" />
  );
  let [Tabledistatus, settabledistatus] = useState(false);
  if (Tabledistatus) {
    Tabledisplay = (
      <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
 
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
  }, [count]);

  async function getlistapi() {
    const { data: Atlist } = await GetListingForJobcategory();
    setAtlist(Atlist);
    // Atlist.map((e,i)=>
    //   Atlist[i].action=<i className="icon-options icons font-2xl d-block mt-4" ></i>

    //                 )
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
    await DeleteJobcategoryDataById(idofEdit)
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
      <div></div>
      // <EditButtonForJobCategory
      //   IDforAPI={idofEdit}
      //   refresh={refreshfn}
      //   cross={HandleCrossEditforlisting}
      // />
    );
  } else {
    EditshowModel = "";
  }

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
        {/* <li>
          <AddJobCategory refresh={refreshfn} />
        </li> */}
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
        {/* <li />
        <AddJobCategory refresh={refreshfn} /> */}
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
          <h3 className="heading">JOB CATEGORY</h3>
        </div>
      </div>
      <br />
      {EditshowModel}
      {Tabledisplay}
    </div>
  );
};

export default TestListing;
