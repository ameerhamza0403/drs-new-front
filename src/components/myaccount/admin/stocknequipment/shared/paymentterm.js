import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************PaymentTerm*********************** */
let apiurlPaymentTerm= apiUrl + '/masterdata/PaymentTerms';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidPaymentTerm(Id) {
    return `${apiurlPaymentTerm}/${Id}`;
  }

  function ApiwithbyPgPaymentTerm(Pg,PgSize) {
    return `${apiurlPaymentTerm}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForPaymentTerm(pg,pgsize) {
    return axios.get(ApiwithbyPgPaymentTerm(pg,pgsize),
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
export function GetPaymentTermDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidPaymentTerm(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutPaymentTermDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidPaymentTerm(id),body)

}

//------- Delete-API

export function DeletePaymentTermDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidPaymentTerm(id))

}

//----------Save-Post-API
export function PostListingForPaymentTerm(body) {
    return axios.post(apiurlPaymentTerm,body)

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


