import { apiUrl,accountId } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlTemplateUsageType= apiUrl + '/masterdata/TemplateUsageTypes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTemplateUsageType(Id) {
    return `${apiurlTemplateUsageType}/${Id}`;
  }

  function ApiwithbyPgTemplateUsageType(Pg,PgSize) {
    return `${apiurlTemplateUsageType}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForTemplateUsageType(pg,pgsize) {
    return axios.get(ApiwithbyPgTemplateUsageType(pg,pgsize),
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
export function GetTemplateUsageTypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTemplateUsageType(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTemplateUsageTypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTemplateUsageType(id),body)

}

//------- Delete-API

export function DeleteTemplateUsageTypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTemplateUsageType(id))

}

//----------Save-Post-API
export function PostListingForTemplateUsageType(body) {
    return axios.post(apiurlTemplateUsageType,body)

}
