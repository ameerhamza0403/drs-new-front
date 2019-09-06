import { apiUrl,accountId } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlTemplateKeyword= apiUrl + '/masterdata/TemplateKeywords';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTemplateKeyword(Id) {
    return `${apiurlTemplateKeyword}/${Id}`;
  }

  function ApiwithbyPgTemplateKeyword(Pg,PgSize) {
    return `${apiurlTemplateKeyword}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForTemplateKeyword(pg,pgsize) {
    return axios.get(ApiwithbyPgTemplateKeyword(pg,pgsize),
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
export function GetTemplateKeywordDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTemplateKeyword(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTemplateKeywordDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTemplateKeyword(id),body)

}

//------- Delete-API

export function DeleteTemplateKeywordDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTemplateKeyword(id))

}

//----------Save-Post-API
export function PostListingForTemplateKeyword(body) {
    return axios.post(apiurlTemplateKeyword,body)

}
