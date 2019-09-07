import { apiUrl,accountId } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlTemplateUsage= apiUrl + '/masterdata/TemplateUsages';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTemplateUsage(Id) {
    return `${apiurlTemplateUsage}/${Id}`;
  }

  function ApiwithbyPgTemplateUsage(Pg,PgSize) {
    return `${apiurlTemplateUsage}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForTemplateUsage(pg,pgsize) {
    return axios.get(ApiwithbyPgTemplateUsage(pg,pgsize),
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
export function GetTemplateUsageDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTemplateUsage(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTemplateUsageDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTemplateUsage(id),body)

}

//------- Delete-API

export function DeleteTemplateUsageDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTemplateUsage(id))

}

//----------Save-Post-API
export function PostListingForTemplateUsage(body) {
    return axios.post(apiurlTemplateUsage,body)

}
