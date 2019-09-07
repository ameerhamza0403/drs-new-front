import { apiUrl,accountId } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlLocation= apiUrl + '/masterdata/Locations';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidLocation(Id) {
    return `${apiurlLocation}/${Id}`;
  }

  function ApiwithbyPgLocation(Pg,PgSize) {
    return `${apiurlLocation}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForLocation(pg,pgsize) {
    return axios.get(ApiwithbyPgLocation(pg,pgsize),
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
export function GetLocationDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidLocation(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutLocationDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidLocation(id),body)

}

//------- Delete-API

export function DeleteLocationDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidLocation(id))

}

//----------Save-Post-API
export function PostListingForLocation(body) {
    return axios.post(apiurlLocation,body)

}
