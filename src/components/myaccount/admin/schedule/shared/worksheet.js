import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlWorkSheet= apiUrl + '/masterdata/WorkSheets';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidWorkSheet(Id) {
    return `${apiurlWorkSheet}/${Id}`;
  }

  function ApiwithbyPgWorkSheet(Pg,PgSize) {
    return `${apiurlWorkSheet}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForWorkSheet(pg,pgsize) {
    return axios.get(ApiwithbyPgWorkSheet(pg,pgsize),
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
export function GetWorkSheetDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidWorkSheet(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutWorkSheetDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidWorkSheet(id),body)

}

//------- Delete-API

export function DeleteWorkSheetDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidWorkSheet(id))

}

//----------Save-Post-API
export function PostListingForWorkSheet(body) {
    return axios.post(apiurlWorkSheet,body)

}
