import React, {useState, useEffect, useRef} from 'react';
import MUIDataTable from "mui-datatables";
// import icon1 from '..//..//..//..//images/icon-1.png';
import './listing.css';
import EditButton from './edit';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {GetListingForContactGroup, DeleteContactGroupDataById} from '..//shared/contact';
import { async } from 'q';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddButton from './add';


let idofEdit = 0;
let menuDiv='';
let EditshowModel='';
let count=0;
// export function changeeffect(){
//     return count++;
// }

let ContactsGroupListingTable=()=>{

    let [Atlist, setAtlist] = useState([
        {
            icon: '',
            name:'',
        }
    ]);
    // const iconset = ()=> <img src={icon1}/>
    // const data = [
    //     ['Cupcake', iconset()],
    //     ['BCake', iconset()],
    //     ['ZCake', iconset()],
    // ];

    

    const columns = [
        {
          name: "contactGroupId",
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
            name: "icon",
            label: "Icon",
            options: {
              filter: false,
              sort: false,
            }
          }
      ];
    
      const options = {
        filterType: "multiselect",
        onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData, rowMeta),
        rowsPerPageOptions: [2, 5, 10, 15, 20, 100],
        selectableRows: "none",
        viewColumns: true,
        // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),
      };

      let Tabledisplay=<LinearProgress />
      let [Tabledistatus, settabledistatus]=useState(false)
      if(Tabledistatus){
        Tabledisplay=<MUIDataTable 
        title={"Contact Groups"} 
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
      
    const StyledMenuItem = withStyles(theme => ({
        root: {
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
            },
          },
        },
      }))(MenuItem);

    
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
            EditshowModel=<EditButton click={Editstate} cross={HandleCrossEditforlisting} refresh={refreshfn} IDforAPI={idofEdit}/>
    }
    else{
        EditshowModel='';
    }

      useEffect(() => {
        getlistapi();
      },[count]
      );

      

      async function getlistapi() {
        let { data: Atlist } = await GetListingForContactGroup()
                setAtlist(Atlist)
                Atlist.map((e,i)=>
                        Atlist[i].icon=<img src={e.icon}/>
                        
                    )
                    settabledistatus(Tabledistatus=true)
        
      }

      
      
      async function Dellistapi() {
        await DeleteContactGroupDataById(idofEdit);
        Handlerowclose();
        refreshfn();
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
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu'>AutoRef.</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu'>EmptyGroup</div>
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
          <AddButton click={refreshfn}/>
            {menuDiv}
            {EditshowModel}
            {Tabledisplay}
        </div>
           
    )
}


export default ContactsGroupListingTable;