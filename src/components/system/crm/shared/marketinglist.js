import { apiUrl } from '../../../../config.json'
import axios from "axios";

/* *************************Crm MarketingList*********************** */
let apiurlCrmMarketingList = apiUrl + "/crm/MarketingLists";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCrmMarketingList(Id) {
  return `${apiurlCrmMarketingList}/${Id}`;
}

function ApiwithbyPgCrmMarketingList(Pg, PgSize) {
  return `${apiurlCrmMarketingList}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetCrmMarketingList(pg, pgsize) {
  return axios.get(ApiwithbyPgCrmMarketingList(pg, pgsize), {
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
export function GetCrmMarketingListById(id) {
  // console.log(id)
  return axios.get(ApiwithidCrmMarketingList(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCrmMarketingList(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCrmMarketingList(id), body);
}

//------- Delete-API

export function DeleteCrmMarketingList(id) {
  // console.log(id)
  return axios.delete(ApiwithidCrmMarketingList(id));
}

//----------Save-Post-API
export function PostCrmMarketingList(body) {
  return axios.post(apiurlCrmMarketingList, body);
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
