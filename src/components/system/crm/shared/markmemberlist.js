import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm MarkMemberList*********************** */
let apiurlCrmMarkMemberList = apiUrl + "/crm/MarketingListMembers";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmMarkMemberList(Id) {
  return `${apiurlCrmMarkMemberList}/${Id}`;
}

function ApiwithbyPgCrmMarkMemberList(Pg, PgSize) {
  return `${apiurlCrmMarkMemberList}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmMarkMemberList(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmMarkMemberList(pg, pgsize), {
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
export function GetCrmMarkMemberListById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmMarkMemberList(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmMarkMemberList(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmMarkMemberList(id), body);
}

//------- Delete-API

export function DeleteCrmMarkMemberList(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmMarkMemberList(id));
}

//----------Save-Post-API
export function PostCrmMarkMemberList(body) {
  return axios.post(apiurlCrmMarkMemberList, body);
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
