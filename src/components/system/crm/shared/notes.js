import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm Notes*********************** */
let apiurlCrmNotes = apiUrl + "/crm/Notes";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmNotes(Id) {
  return `${apiurlCrmNotes}/${Id}`;
}

function ApiwithbyPgCrmNotes(Pg, PgSize) {
  return `${apiurlCrmNotes}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmNotes(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmNotes(pg, pgsize), {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Expose-Headers": "*"
    }
  });
}

//---------Get APi by Contact ID

let apitogetbycontactid = apiUrl + "/crm/Notes/contacts";
function Apigetnotesbycontact(Id) {
  return `${apitogetbycontactid}/${Id}`;
}

export function GetCrmNotesByContact(id) {
  // console.log(id)
  return axios.get(Apigetnotesbycontact(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// --------- Get Note by Parent Note

let urlnotebyparentnote= apiUrl + '/crm/Notes/notes';
function ApiNoteByParentNote(Id) {
  return `${urlnotebyparentnote}/${Id}`;
}

export function GetNoteByParentNoteApi(id) {
  // console.log(id)
  return axios.get(ApiNoteByParentNote(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// --------- Get Note by Parent Note

let urlactivitiesbynote= apiUrl + '/crm/Activities/notes';
function ApiActivitiesbyNote(Id) {
  return `${urlactivitiesbynote}/${Id}`;
}

export function GetActivitiesByNoteApi(id) {
  // console.log(id)
  return axios.get(ApiActivitiesbyNote(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// --------- Get Note by Parent Note

let urlnotebyperson= apiUrl + '/crm/Notes/contactpersons';
function ApinotebyPerson(Id) {
  return `${urlnotebyperson}/${Id}`;
}

export function GetNoteByPersonId(id) {
  // console.log(id)
  return axios.get(ApinotebyPerson(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}


//---------Edit APi
export function GetCrmNotesById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmNotes(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmNotes(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmNotes(id), body);
}

//------- Delete-API

export function DeleteCrmNotes(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmNotes(id));
}

//----------Save-Post-API
export function PostCrmNotes(body) {
  return axios.post(apiurlCrmNotes, body);
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

