import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import icon1 from '..//..//..//..//images/icon-1.png';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AutoIcon from '@material-ui/icons/WbIridescent';
import './listing.css';
import EditButton from './edit';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import EditNoteType from './edit';
import {GetListingForNote, DeleteNoteDataById} from '..//shared/notetype';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddNoteType from './add';


let menuDiv='';
let EditshowModel='';
let ColorStyle={};
let idofEdit = 0;
let NotesTypeListing=()=>{
    


    let [Atlist, setAtlist] = useState([]);

    const columns = [
      {
        name: "noteTypeId",
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

    
      let Tabledisplay=<LinearProgress />
      let [Tabledistatus, settabledistatus]=useState(false)
      if(Tabledistatus){
        Tabledisplay=<MUIDataTable 
        title={"Notes Type"} 
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


    useEffect(() => {
      getlistapi();
    },[]
    );
  
    async function getlistapi() {
      const { data: Atlist } = await GetListingForNote();
      setAtlist(Atlist);
      settabledistatus(Tabledistatus=true)
    }
  

    async function Dellistapi() {
      await DeleteNoteDataById(idofEdit);
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
            EditshowModel=<EditNoteType click={Editstate} cross={HandleCrossEditforlisting} IDforAPI={idofEdit} refresh={refreshfn}/>
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
          <AddNoteType refresh={refreshfn} />
            {menuDiv}
            {EditshowModel}
            {Tabledisplay}
            
        </div>
           
    )
}


export default NotesTypeListing;