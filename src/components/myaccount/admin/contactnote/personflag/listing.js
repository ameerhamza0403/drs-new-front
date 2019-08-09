import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import './listing.css';
import EditButtonForPersonFlag from './edit';
import {GetListingForPersonflag, DeletePersonflagDataById} from '..//shared/personflag';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddPersonFlag from './add';

let menuDiv='';
let EditshowModel='';
let ColorStyle={};
let idofEdit = 0;
let count =0;
let PersonFlagListing=()=>{
    let ColorStyleFn=(mycolor)=>{
        let code = '#'+mycolor;
        return(
            ColorStyle={
                background: code,
            }
        )
    }


    let [Atlist, setAtlist] = useState([
        {
          colorCode: "",
          name: ""
        }
      ]);
    
      const columns = [
        {
          name: "personFlagId",
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
          name: "colorCode",
          label: "Color",
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

      let Tabledisplay=<LinearProgress />
      let [Tabledistatus, settabledistatus]=useState(false)
      if(Tabledistatus){
        Tabledisplay=<MUIDataTable 
        title={"Notes Flag"} 
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
      }, [count]);
    
      async function getlistapi() {
        let { data: Atlist } = await GetListingForPersonflag();
        setAtlist(Atlist);
        Atlist.map(
          (e, i) =>
            (Atlist[i].colorCode = (
              <div className="ColorCodesl" style={ColorStyleFn(e.colorCode)} />
            ))
        );
        settabledistatus(Tabledistatus=true)
      }
    
      async function Dellistapi() {
        await DeletePersonflagDataById(idofEdit);
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
            EditshowModel=<EditButtonForPersonFlag click={Editstate} cross={HandleCrossEditforlisting} refresh={refreshfn} IDforAPI={idofEdit}/>
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
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu'onClick={Dellistapi} >Delete</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={Handlerowclose}>Close</div>
                        </div>
                    </div>
        }
        else if(!menushow){
            menuDiv=<div className='container empty'></div>;
        }

    
    return(
        <div>
          <AddPersonFlag refresh={refreshfn}/>
            {menuDiv}
            {EditshowModel}
            {Tabledisplay}
        </div>
           
    )
}


export default PersonFlagListing;