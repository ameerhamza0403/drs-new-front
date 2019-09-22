import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************ActivityType*********************** */
let apiurlActivityType= apiUrl + '/crm/ActivityTypes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidActivityType(Id) {
    return `${apiurlActivityType}/${Id}`;
  }

  function ApiwithbyPgActivityType(Pg,PgSize) {
    return `${apiurlActivityType}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForActivityType(pg,pgsize) {
    return axios.get(ApiwithbyPgActivityType(pg,pgsize),
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
export function GetActivityTypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidActivityType(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutActivityTypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidActivityType(id),body)

}

//------- Delete-API

export function DeleteActivityTypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidActivityType(id))

}

//----------Save-Post-API
export function PostListingForActivityType(body) {
    return axios.post(apiurlActivityType,body)

}

//----------Upload File

let apiforupload=apiUrl + '/common/Uploads';


export function PostListingForFileUpload(body) {
  return axios.post(apiforupload,body,
    {headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Expose-Headers': '*',
       }}
   )
}


