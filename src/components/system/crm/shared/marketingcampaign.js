import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm MarkCampaign*********************** */
let apiurlCrmMarkCampaign = apiUrl + "/crm/MarketingCampaigns";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmMarkCampaign(Id) {
  return `${apiurlCrmMarkCampaign}/${Id}`;
}

function ApiwithbyPgCrmMarkCampaign(Pg, PgSize) {
  return `${apiurlCrmMarkCampaign}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmMarkCampaign(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmMarkCampaign(pg, pgsize), {
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
export function GetCrmMarkCampaignById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmMarkCampaign(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmMarkCampaign(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmMarkCampaign(id), body);
}

//------- Delete-API

export function DeleteCrmMarkCampaign(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmMarkCampaign(id));
}

//----------Save-Post-API
export function PostCrmMarkCampaign(body) {
  return axios.post(apiurlCrmMarkCampaign, body);
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
