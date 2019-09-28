import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm Leads*********************** */
let apiurlCrmLead = apiUrl + "/crm/Leads";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmLead(Id) {
  return `${apiurlCrmLead}/${Id}`;
}

function ApiwithbyPgCrmLead(Pg, PgSize) {
  return `${apiurlCrmLead}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmLead(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmLead(pg, pgsize), {
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
export function GetCrmLeadById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmLead(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmLead(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmLead(id), body);
}

//------- Delete-API

export function DeleteCrmLead(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmLead(id));
}

//----------Save-Post-API
export function PostCrmLead(body) {
  return axios.post(apiurlCrmLead, body);
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
