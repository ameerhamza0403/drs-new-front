import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Tax Code*********************** */
let apiurlTaxCode= apiUrl + '/masterdata/TaxCodes';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlTaxCodeall= apiUrl + '/masterdata/TaxCodes/0/0';



function ApiwithidTaxCode(Id) {
    return `${apiurlTaxCode}/${Id}`;
  }

  function ApiwithbyPgTaxCode(Pg,PgSize) {
    return `${apiurlTaxCode}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForTaxCode(pg,pgsize) {
    return axios.get(ApiwithbyPgTaxCode(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//-------- GetAPiAll
export function GetAllListingForTaxCode() {
  return axios.get(apiurlTaxCodeall,
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
export function GetTaxCodeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTaxCode(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTaxCodeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTaxCode(id),body)

}

//------- Delete-API

export function DeleteTaxCodeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTaxCode(id))

}

//----------Save-Post-API
export function PostListingForTaxCode(body) {
    return axios.post(apiurlTaxCode,body)

}


