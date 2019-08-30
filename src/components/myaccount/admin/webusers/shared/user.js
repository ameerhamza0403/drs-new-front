import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlUser= apiUrl + '/masterdata/AddUsers';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidUser(Id) {
    return `${apiurlUser}/${Id}`;
  }

  function ApiwithbyPgUser(Pg,PgSize) {
    return `${apiurlUser}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForUser(pg,pgsize) {
    return axios.get(ApiwithbyPgUser(pg,pgsize),
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
export function GetUserDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidUser(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutUserDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidUser(id),body)

}

//------- Delete-API

export function DeleteUserDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidUser(id))

}

//----------Save-Post-API
export function PostListingForUser(body) {
    return axios.post(apiurlUser,body)

}
