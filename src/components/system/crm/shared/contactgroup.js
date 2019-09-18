import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************CrmContactGroup*********************** */
let apiurlCrmContactGroup = apiUrl + "/masterdata/ContactGroups";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmContactGroup(Id) {
  return `${apiurlCrmContactGroup}/${Id}`;
}

function ApiwithbyPgCrmContactGroup(Pg, PgSize) {
  return `${apiurlCrmContactGroup}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmContactGroup(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmContactGroup(pg, pgsize), {
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
export function GetCrmContactById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmContactGroup(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmContactGroup(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmContactGroup(id), body);
}

//------- Delete-API

export function DeleteCrmContactGroup(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmContactGroup(id));
}

//----------Save-Post-API
export function PostCrmContactGroup(body) {
  return axios.post(apiurlCrmContactGroup, body);
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
