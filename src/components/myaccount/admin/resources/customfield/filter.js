import React from 'react';
import AddCustomField from './add';
import CustomFieldListing from './listing';
import { Button, Divider, Form, Radio } from 'semantic-ui-react';

let dataforlist=[];
let btn='';
let FilterForCustomField=()=>{

    const data = [
        ['Cupcake', 'WholeNumber', 'Yes', 'Hello'],
        ['Go', 'Decimal', 'Yes', 'Bela'],
        ['Java', 'Bool', 'No', 'Ana'],

    ];
    const datat = [
        ['flavour', 'WholeNumber', 'Yes', 'Hello'],
        ['water', 'Decimal', 'Yes', 'Bela'],
        ['organs', 'Bool', 'No', 'Ana'],

    ];

    
    let filterrow=[
        {value:'engineer', text:'Engineer' },
        {value:'engineer1', text:'Engineer1' },
        {value:'engineer2', text:'Engineer2' },
    ]

    let [option, setoption] = React.useState('');
    let handleChange = event => {
        setoption(option = event.target.value);
    };

    if(option==='engineer'){
        dataforlist=data;
        btn='ui button'
    }
    else if(option==='engineer1'){
        dataforlist=datat;
        btn='ui button'
    }
    else if(option==='engineer2'||option===''){
        dataforlist=[];
        btn='ui disabled button'
    }

    return(
            <div className='Container'>
                <div className='row'>
                    <div ClassName='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={handleChange}>
                        <option value='' ></option>
                        {filterrow.map((item)=>
                                <option value={item.value} >{item.text}</option>
                        )}
                    </select>
                    </div>
                </div>
                <Divider hidden />
                <AddCustomField btncls={btn}/>
                <CustomFieldListing list={dataforlist}/>
            </div>
    )
}

export default FilterForCustomField;