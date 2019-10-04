import { apiUrl } from "../../../../config.json";
import axios from "axios";

/* *************************Crm SalesOpp*********************** */
let apiurlCrmSalesOpp = apiUrl + "/crm/SalesOpportunities";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmSalesOpp(Id) {
  return `${apiurlCrmSalesOpp}/${Id}`;
}

function ApiwithbyPgCrmSalesOpp(Pg, PgSize) {
  return `${apiurlCrmSalesOpp}/${Pg}/${PgSize}`;
}

function ApiwithbyPgCrmSalesOppquery(Pg, PgSize, query) {
  return `${apiurlCrmSalesOpp}/${Pg}/${PgSize}${query}`;
}
//-------- GetAPi
export function GetCrmSalesOpp(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmSalesOpp(pg, pgsize), {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Expose-Headers": "*"
    }
  });
}

export function GetCrmSalesOppquery(pg, pgsize, query) {
  return axios.get(ApiwithbyPgCrmSalesOppquery(pg, pgsize, query), {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Expose-Headers": "*"
    }
  });
}
//---------Edit APi
export function GetCrmSalesOppById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmSalesOpp(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmSalesOpp(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmSalesOpp(id), body);
}

//------- Delete-API

export function DeleteCrmSalesOpp(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmSalesOpp(id));
}

//----------Save-Post-API
export function PostCrmSalesOpp(body) {
  return axios.post(apiurlCrmSalesOpp, body);
}

//----------Upload File

let apiforupload = apiUrl + "/common/Uploads";

export function PostFileUpload(body) {
  return axios.post(apiforupload, body, {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data"
      // 'Access-Control-Expose-Headers': '*',
    }
  });
}
