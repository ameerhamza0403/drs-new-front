import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlTimesheetActivity= apiUrl + '/masterdata/TimesheetActivities';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTimesheetActivity(Id) {
    return `${apiurlTimesheetActivity}/${Id}`;
  }

  function ApiwithbyPgTimesheetActivity(Pg,PgSize) {
    return `${apiurlTimesheetActivity}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForTimesheetActivity(pg,pgsize) {
    return axios.get(ApiwithbyPgTimesheetActivity(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//---------Edit APi
export function GetTimesheetActivityDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTimesheetActivity(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTimesheetActivityDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTimesheetActivity(id),body)

}

//------- Delete-API

export function DeleteTimesheetActivityDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTimesheetActivity(id))

}

//----------Save-Post-API
export function PostListingForTimesheetActivity(body) {
    return axios.post(apiurlTimesheetActivity,body)

}
