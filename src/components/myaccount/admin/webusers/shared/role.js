import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlRole= apiUrl + '/masterdata/Roles';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidRole(Id) {
    return `${apiurlRole}/${Id}`;
  }

  function ApiwithbyPgRole(Pg,PgSize) {
    return `${apiurlRole}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForRole(pg,pgsize) {
    return axios.get(ApiwithbyPgRole(pg,pgsize),
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
export function GetRoleDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidRole(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutRoleDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidRole(id),body)

}

//------- Delete-API

export function DeleteRoleDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidRole(id))

}

//----------Save-Post-API
export function PostListingForRole(body) {
    return axios.post(apiurlRole,body)

}
