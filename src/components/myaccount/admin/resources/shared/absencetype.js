import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Absence Type*********************** */
 let apiurlAbsenceType= apiUrl + '/masterdata/AbsenceTypes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidAbsencetype(Id) {
    return `${apiurlAbsenceType}/${Id}`;
  }

  function ApiPagingAbsencetype(PG,PGSIZE) {
    return `${apiurlAbsenceType}/${PG}/${PGSIZE}`;
  }

//-------- GetAPi
export function GetListingpgForAbsencetype(pg, pgsize) {
    return axios.get(ApiPagingAbsencetype(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//-------- GetAPi
export function GetListingForAbsence() {
    return axios.get(apiurlAbsenceType,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetAbsenceDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidAbsencetype(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutAbsenceDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidAbsencetype(id),body)

}

//------- Delete-API

export function DeleteAbsenceDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidAbsencetype(id))

}

//----------Save-Post-API
export function PostListingForAbsence(body) {
    return axios.post(apiurlAbsenceType,body)

}

