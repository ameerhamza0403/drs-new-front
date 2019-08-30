import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlDepartmentCode= apiUrl + '/masterdata/DepartmentCodes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidDepartmentCode(Id) {
    return `${apiurlDepartmentCode}/${Id}`;
  }

  function ApiwithbyPgDepartmentCode(Pg,PgSize) {
    return `${apiurlDepartmentCode}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForDepartmentCode(pg,pgsize) {
    return axios.get(ApiwithbyPgDepartmentCode(pg,pgsize),
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
export function GetDepartmentCodeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidDepartmentCode(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutDepartmentCodeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidDepartmentCode(id),body)

}

//------- Delete-API

export function DeleteDepartmentCodeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidDepartmentCode(id))

}

//----------Save-Post-API
export function PostListingForDepartmentCode(body) {
    return axios.post(apiurlDepartmentCode,body)

}
