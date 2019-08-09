import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import './listing.css';
import AddeditEdit from './edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Icon2 from '@material-ui/icons/Clear';
import {GetListingForAddEdit, DeleteAddEditDataById} from '..//shared/addedit';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddeditAdd from './add';

let idofEdit = 0;
let count=0;
let menuDiv='';
let EditshowModel='';
let AddeditListing=()=>{

  let Tabledisplay=<LinearProgress />
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
          name: "active",
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
        viewColumns: true
        // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
      };
      useEffect(() => {
        getlistapi();
      }, [count]);
    
      async function getlistapi() {
        let { data: Atlist } = await GetListingForAddEdit();
        setAtlist(Atlist);
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
        title={"Add-Edit"} 
        data={Atlist} 
        columns={columns} 
        options={options} 
        
    />;
      }
      else{
        Tabledisplay=<LinearProgress />
      }
    let refreshfn=()=>{
      settabledistatus(Tabledistatus=false)
      getlistapi();
    }
      async function Dellistapi() {
        await DeleteAddEditDataById(idofEdit);
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
        if(menushow){
            menuDiv=<div className='container menu'>
                        <div className='row menu'>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={HandleEditforlisting}>Edit</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={Dellistapi}>Delete</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={Handlerowclose}>Close</div>
                        </div>
                    </div>
        }
        else if(!menushow){
            menuDiv=<div className='container empty'></div>;
        }
    
    return(
        <div>
            <AddeditAdd click={refreshfn}/>
            {menuDiv}
            {EditshowModel}
            {Tabledisplay}
            
            
        </div>
           
    )
}


export default AddeditListing;