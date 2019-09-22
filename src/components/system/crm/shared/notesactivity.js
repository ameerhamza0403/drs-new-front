import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm NotesActivity*********************** */
let apiurlCrmNotesActivity = apiUrl + "/crm/Activities";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmNotesActivity(Id) {
  return `${apiurlCrmNotesActivity}/${Id}`;
}

function ApiwithbyPgCrmNotesActivity(Pg, PgSize) {
  return `${apiurlCrmNotesActivity}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmNotesActivity(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmNotesActivity(pg, pgsize), {
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
export function GetCrmNotesActivityById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmNotesActivity(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmNotesActivity(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmNotesActivity(id), body);
}

//------- Delete-API

export function DeleteCrmNotesActivity(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmNotesActivity(id));
}

//----------Save-Post-API
export function PostCrmNotesActivity(body) {
  return axios.post(apiurlCrmNotesActivity, body);
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
