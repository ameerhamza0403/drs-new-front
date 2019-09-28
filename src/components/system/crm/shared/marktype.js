import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm MarkType*********************** */
let apiurlCrmMarkType = apiUrl + "/crm/MarketingCampaignTypes";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmMarkType(Id) {
  return `${apiurlCrmMarkType}/${Id}`;
}

function ApiwithbyPgCrmMarkType(Pg, PgSize) {
  return `${apiurlCrmMarkType}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmMarkType(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmMarkType(pg, pgsize), {
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
export function GetCrmMarkTypeById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmMarkType(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmMarkType(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmMarkType(id), body);
}

//------- Delete-API

export function DeleteCrmMarkType(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmMarkType(id));
}

//----------Save-Post-API
export function PostCrmMarkType(body) {
  return axios.post(apiurlCrmMarkType, body);
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
