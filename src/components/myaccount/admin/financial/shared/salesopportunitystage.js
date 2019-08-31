import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlSalesOpportunityStage= apiUrl + '/masterdata/SalesOpportunityStages';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidSalesOpportunityStage(Id) {
    return `${apiurlSalesOpportunityStage}/${Id}`;
  }

  function ApiwithbyPgSalesOpportunityStage(Pg,PgSize) {
    return `${apiurlSalesOpportunityStage}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForSalesOpportunityStage(pg,pgsize) {
    return axios.get(ApiwithbyPgSalesOpportunityStage(pg,pgsize),
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
export function GetSalesOpportunityStageDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidSalesOpportunityStage(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutSalesOpportunityStageDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidSalesOpportunityStage(id),body)

}

//------- Delete-API

export function DeleteSalesOpportunityStageDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidSalesOpportunityStage(id))

}

//----------Save-Post-API
export function PostListingForSalesOpportunityStage(body) {
    return axios.post(apiurlSalesOpportunityStage,body)

}
