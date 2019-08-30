import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlSalesOpportunityFlag= apiUrl + '/masterdata/SalesOpportunityFlags';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidSalesOpportunityFlag(Id) {
    return `${apiurlSalesOpportunityFlag}/${Id}`;
  }

  function ApiwithbyPgSalesOpportunityFlag(Pg,PgSize) {
    return `${apiurlSalesOpportunityFlag}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForSalesOpportunityFlag(pg,pgsize) {
    return axios.get(ApiwithbyPgSalesOpportunityFlag(pg,pgsize),
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
export function GetSalesOpportunityFlagDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidSalesOpportunityFlag(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutSalesOpportunityFlagDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidSalesOpportunityFlag(id),body)

}

//------- Delete-API

export function DeleteSalesOpportunityFlagDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidSalesOpportunityFlag(id))

}

//----------Save-Post-API
export function PostListingForSalesOpportunityFlag(body) {
    return axios.post(apiurlSalesOpportunityFlag,body)

}
