import React, {Component, useState} from 'react';
import ContactsGroupListingTable from './contactgroup/listing';
import NotesFlagListingTable from './notesflag/listing';
import NotesTypeListing from './notetype/listing';
import './contactgroup.css'
import PersonFlagListing from './personflag/listing';

let DisplayCnN='';
let ContactGroupsTab =()=>{

    let [SwitchTabState, setSwitchTabState] = useState(1);
    if(SwitchTabState===1){
        DisplayCnN=<div><ContactsGroupListingTable/></div>
    }
    else if(SwitchTabState===2){
        DisplayCnN=<div><NotesFlagListingTable /></div>
    }
    else if(SwitchTabState===3){
        DisplayCnN=<div><NotesTypeListing /></div>
    }
    else if(SwitchTabState===4){
        DisplayCnN=<div><PersonFlagListing /></div>
    }

    return(
        <div className='container'>
            <div className='switch'>
                <ul>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 1)}>Contact Group</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 2)}>Notes Flag</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 3)}>Notes Type</li>
                    <li onClick={()=>setSwitchTabState(SwitchTabState = 4)}>Person Flag</li>
                </ul>
            </div>
            {DisplayCnN}
            
        </div>
    )
}

export default ContactGroupsTab;