import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import './listing.css';
import EditCustomField from './edit';
import AddCustomField from './add';

let menuDiv='';
let EditshowModel='';
let CustomFieldListing=(props)=>{


    const columns = ["Name", "Type", "Mandatory", "Default Value" ];
    const data = props.list;

    const options = {
        filterType: 'multiselect',
        onRowClick: (rowData, rowMeta) => HandlerowSelect(rowData,rowMeta),
        rowsPerPageOptions: [2,5,10,15,20,100],
        selectableRows: 'none',
        // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, ' : ', allRowsSelected ),

    };

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
        EditshowModel=<EditCustomField click={Editstate} cross={HandleCrossEditforlisting}/>
    }
    else{
        EditshowModel='';
    }



    let [menushow, setMenushow]= useState(false);
    let HandlerowSelect=(data,meta)=>{
        menuDiv='';
        return setMenushow(menushow= true)
    }
    let Handlerowclose=(data,meta)=>{
        return setMenushow(menushow= false)
    }
        if(menushow){
            menuDiv=<div className='container menu'>
                        <div className='row menu'>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={HandleEditforlisting}>Edit</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu'>Delete</div>
                            <div className='col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 menu' onClick={Handlerowclose}>Close</div>
                        </div>
                    </div>
        }
        else if(!menushow){
            menuDiv=<div className='container empty'></div>;
        }


    return(
        <div>
          <AddCustomField />
            {menuDiv}
            {EditshowModel}

            <MUIDataTable
                title={"Staff Custom Fields"}
                data={data}
                columns={columns}
                options={options}

            />

        </div>

    )
}


export default CustomFieldListing;
