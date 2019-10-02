import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm Assign Campaign*********************** */
let apiurlCrmAssign = apiUrl + "/crm/MarketingCampaignLists";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmAssign(Id) {
  return `${apiurlCrmAssign}/${Id}`;
}

function ApiwithbyPgCrmAssign(Pg, PgSize) {
  return `${apiurlCrmAssign}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmAssign(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmAssign(pg, pgsize), {
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
let byidurl = apiUrl + '/crm/MarketingCampaignLists/byid';
function Apibyidbyid(idCamp, idlist) {
  return `${byidurl}/${idCamp}/${idlist}`;
}
export function GetCrmAssignById(idCamp,idlist) {
  // console.log(id)
  return axios.get(Apibyidbyid(idCamp,idlist), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmAssign(idCamp,idlist,value) {
  // console.log(id)
  return axios.put(ApiwithbyPgCrmAssign(idCamp,idlist),value);
}

//------- Delete-API

export function DeleteCrmAssign(idCamp,idlist) {
  // console.log(id)
  return axios.delete(ApiwithbyPgCrmAssign(idCamp,idlist));
}

//----------Save-Post-API
export function PostCrmAssign(body) {
  return axios.post(apiurlCrmAssign, body);
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
