import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm Contact Person*********************** */
let apiurlCrmContactPerson = apiUrl + "/crm/ContactPersons";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmContactPerson(Id) {
  return `${apiurlCrmContactPerson}/${Id}`;
}

function ApiwithbyPgCrmContactPerson(Pg, PgSize) {
  return `${apiurlCrmContactPerson}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmContactPerson(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmContactPerson(pg, pgsize), {
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
export function GetCrmContactPersonById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmContactPerson(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmContactPerson(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmContactPerson(id), body);
}

//------- Delete-API

export function DeleteCrmContactPerson(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmContactPerson(id));
}

//----------Save-Post-API
export function PostCrmContactPerson(body) {
  return axios.post(apiurlCrmContactPerson, body);
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
