import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import "../../../../../scss/override/listing.scss";
import AddeditEdit from './edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Icon2 from '@material-ui/icons/Clear';
import {GetListingpgForResource, DeleteAddEditDataById} from '..//shared/addedit';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddeditAdd from './add';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let idofEdit = 0;
let count=0;
let menuDiv='';
let EditshowModel='';
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


let AddeditListing=()=>{

  let [paginate, setPaginate] = useState();


  let Tabledisplay=<LinearProgress style={classes.linearprogress} color="secondary" />
    let [Tabledistatus, settabledistatus]=useState(false)
    let icon=(status)=>{
        let iconvalue = <Icon2 />
        if(status===true){
            iconvalue = <DoneOutlineIcon />
        }
        else if(status===false){
            iconvalue = <Icon2 />
        }
        return iconvalue;
    }

    let iconcross=(status)=>{
        let iconvalue = <DoneOutlineIcon />
        if((status==='not active for jobwatch')||(status==='only visible on schedule')){
            iconvalue = <Icon2 />
        }
        else{
            iconvalue = <DoneOutlineIcon />
        }
        return iconvalue;
    }

    let [Atlist, setAtlist] = useState([
        {
            resourceId: 0,
            name: "",
            resourceGroupId: 0,
            timeZone: "",
            mobilePhone: "",
            maxTravelDistance: 0,
            jobWatchSetting: "",
            reference: "",
            code: "",
            businessKey: "",
            privateKey: "",
            tachoCard: "",
            fuelCard: "",
            payrollNumber: "",
            managerId: 0,
            holidaysStartDate: "2019-08-08T07:58:02.308Z",
            workingHours: "",
            hourlyRate: 0,
            specialHourlyRate: "",
            assistants: "",
            currencyId: 0,
            webUser: "",
            vacations: 0,
            skills: "",
            dateOfJoining: "2019-08-08T07:58:02.308Z",
            annualLeaveAllowance: 0,
            emergencyContactDetails: "",
            newUser: true,
            email: "",
            role: "",
            viewOwnResource: true,
            tracked: false,
            owhtPrivate: true,
            hideParentInfo: true
        }
      ]);
      const columns = [
        {
          name: "resourceId",
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
          name: "isActive",
          label: "Status",
          options: {
            filter: false,
            sort: false,
            display: false
          }
        },
        {
          name: "resourceGroupId",
          label: "Group",
          options: {
            filter: false,
            sort: false
          }
        },
        {
            name: "resourceGroupId",
            label: "Phone",
            options: {
              filter: false,
              sort: false
            }
          },
          {
            name: "resourceGroupId",
            label: "Fixed Vehical",
            options: {
              filter: false,
              sort: false
            }
          },
          {
            name: "tracked",
            label: "Resource is Tracked",
            options: {
              filter: false,
              sort: false
            }
          },
          {
            name: "jobWatchSetting",
            label: "Resource has Jobs",
            options: {
              filter: false,
              sort: false
            }
          }
      ];


      const options = {
        filterType: "multiselect",
        onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
        rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
        selectableRows: "none",
        viewColumns: true,
        responsive: 'scroll',
        // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
      };
      useEffect(() => {
        getlistapi();
      }, [count]);

      async function getlistapi() {
        await GetListingpgForResource(Page, PageSize).then(res => {
          setAtlist((Atlist = res.data));
          setPaginate((paginate = JSON.parse(res.headers["x-pagination"])));
        });
        TotalPages = paginate.totalPages;
        Atlist.map(
          (e, i) =>
            (
            Atlist[i].tracked =icon(Atlist[i].tracked),
            Atlist[i].jobWatchSetting =iconcross(Atlist[i].jobWatchSetting)
            )
        );
        settabledistatus(Tabledistatus=true)
      }
      if(Tabledistatus){
        Tabledisplay=<MUIDataTable
        title={"Filters/Actions"}
        data={Atlist}
        columns={columns}
        options={options}

    />;
      }
      else{
        Tabledisplay=<LinearProgress style={classes.linearprogress} color="secondary" />
      }
    let refreshfn=()=>{
      settabledistatus(Tabledistatus=false)
      getlistapi();
    }

     // Toast

 function errort() {
  // add type: 'error' to options
  return toast.error('Failed with Error...', {
    position: toast.POSITION.BOTTOM_RIGHT
  });

}
function success() {
  return toast.success("Deleted Successfully... ", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
}

      async function Dellistapi() {
        await DeleteAddEditDataById(idofEdit).then(() => {
          success();
        }).catch(error => {
            errort();
          });
        Handlerowclose();
        refreshfn();
      }

    let [Editstate, setEditstate] = React.useState(false);
    let HandleEditforlisting=()=>{
        return(
              setEditstate(Editstate= !Editstate),
              Handlerowclose()
              // handleMenuClose()
        )
    }

    let HandleCrossEditforlisting=()=>{
        return(
            setEditstate(Editstate= false)
        )
    }

        if(Editstate){
            EditshowModel=<AddeditEdit click={Editstate} cross={HandleCrossEditforlisting} clickref={refreshfn} IDforAPI={idofEdit}/>
        }
    else{
        EditshowModel='';
    }



    let [menushow, setMenushow]= useState(false);
    let HandlerowSelect=(data,meta)=>{
        menuDiv='';
        idofEdit = data[0];
        return setMenushow(menushow= true)
    }
    let Handlerowclose=(data,meta)=>{
        return setMenushow(menushow= false)
    }
    if (menushow) {
      menuDiv = (
        <ul className="tool">
          <li>
            <AddeditAdd refresh={refreshfn} />
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
          <AddeditAdd refresh={refreshfn} />
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
            <h3 className="heading">MANAGE</h3>
          </div>
        </div>
        <br />
            {EditshowModel}
            {Tabledisplay}


        </div>

    )
}


export default AddeditListing;
