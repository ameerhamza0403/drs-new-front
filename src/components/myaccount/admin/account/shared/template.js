import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Template*********************** */
let apiurlTemplate= apiUrl + '/masterdata/Templates';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTemplate(Id) {
    return `${apiurlTemplate}/${Id}`;
  }

  function ApiwithbyPgTemplate(Pg,PgSize) {
    return `${apiurlTemplate}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForTemplate(pg,pgsize) {
    return axios.get(ApiwithbyPgTemplate(pg,pgsize),
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
export function GetTemplateDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTemplate(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTemplateDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTemplate(id),body)

}

//------- Delete-API

export function DeleteTemplateDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTemplate(id))

}

//----------Save-Post-API
export function PostListingForTemplate(body) {
    return axios.post(apiurlTemplate,body)

}

