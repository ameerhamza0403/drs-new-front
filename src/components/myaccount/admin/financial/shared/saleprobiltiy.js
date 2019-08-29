import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Tax Code*********************** */
let apiurlSaleProb= apiUrl + '/masterdata/SalesOpportunityProbabilities';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlSaleProball= apiUrl + '/masterdata/SalesOpportunityProbabilities/0/0';



function ApiwithidSaleProb(Id) {
    return `${apiurlSaleProb}/${Id}`;
  }

  function ApiwithbyPgSaleProb(Pg,PgSize) {
    return `${apiurlSaleProb}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForSaleProb(pg,pgsize) {
    return axios.get(ApiwithbyPgSaleProb(pg,pgsize),
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
export function GetAllListingForSaleProb() {
  return axios.get(apiurlSaleProball,
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
export function GetSaleProbDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidSaleProb(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutSaleProbDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidSaleProb(id),body)

}

//------- Delete-API

export function DeleteSaleProbDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidSaleProb(id))

}

//----------Save-Post-API
export function PostListingForSaleProb(body) {
    return axios.post(apiurlSaleProb,body)

}


