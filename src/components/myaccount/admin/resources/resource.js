import React, {Component, useState} from 'react';
import './resource.css';
import ResourceAddGroup from './group/add';
import ResourceGroupListing from './group/listing';
import AddResourceSkill from './skills/add';
import ResourceSkillListing from './skills/listing';
import AbsenceListing from './absencetype/listing';
import FilterForCustomField from './customfield/filter';
import AddeditListing from './addedit/listing';
import CurrencyListing from './currency/listing';

let DisplayRes='';
let ResourceTab =(props)=>{

    let [SwitchTabState, setSwitchTabState] = useState(1);
    if(SwitchTabState===1){
        DisplayRes=<div><ResourceGroupListing/></div>
    }
    else if(SwitchTabState===2){
        DisplayRes=<div><AddResourceSkill /><ResourceSkillListing/></div>
    }
    else if(SwitchTabState===3){
        DisplayRes=<div><AbsenceListing /></div>
    }
    else if(SwitchTabState===4){
        DisplayRes= <FilterForCustomField />
    }
    else if(SwitchTabState===5){
        DisplayRes= <div><AddeditListing/></div>
    }
    else if(SwitchTabState===6){
        DisplayRes= <div><CurrencyListing/></div>
    }

    return(
        <div className='container'>
            <div className='switch'>
                <ul>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 1)}>Group</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 2)}>Skills</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 3)}>Absence Type</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 4)}>Custom Field</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 5)}>Add-Edit</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 6)}>Currency</li>
                </ul>
            </div>
            {DisplayRes}
            
        </div>
    )
}

export default ResourceTab;