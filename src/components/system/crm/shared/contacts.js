import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************CrmContacts*********************** */
let apiurlCrmContacts = apiUrl + "/crm/Contacts";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmContacts(Id) {
  return `${apiurlCrmContacts}/${Id}`;
}

function ApiwithbyPgCrmContacts(Pg, PgSize) {
  return `${apiurlCrmContacts}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmContacts(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmContacts(pg, pgsize), {
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
  return axios.get(ApiwithidCrmContacts(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmContacts(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmContacts(id), body);
}

//------- Delete-API

export function DeleteCrmContacts(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmContacts(id));
}

//----------Save-Post-API
export function PostCrmContacts(body) {
  return axios.post(apiurlCrmContacts, body);
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
