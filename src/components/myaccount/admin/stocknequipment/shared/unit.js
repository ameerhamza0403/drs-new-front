import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Unit*********************** */
let apiurlUnit= apiUrl + '/masterdata/Units';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidUnit(Id) {
    return `${apiurlUnit}/${Id}`;
  }

  function ApiwithbyPgUnit(Pg,PgSize) {
    return `${apiurlUnit}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForUnit(pg,pgsize) {
    return axios.get(ApiwithbyPgUnit(pg,pgsize),
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
export function GetUnitDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidUnit(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutUnitDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidUnit(id),body)

}

//------- Delete-API

export function DeleteUnitDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidUnit(id))

}

//----------Save-Post-API
export function PostListingForUnit(body) {
    return axios.post(apiurlUnit,body)

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


