import { apiUrl } from "..//..//..//..//..//config.json";
import axios from "axios";

/* *************************AssetType*********************** */
let apiurlAssetType= apiUrl + "/masterdata/CustomerAssetTypes";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidAssetType(Id) {
  return `${apiurlAssetType}/${Id}`;
}

function ApiwithbyPgAssetType(Pg, PgSize) {
  return `${apiurlAssetType}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetListingForAssetType(pg, pgsize) {
  return axios.get(ApiwithbyPgAssetType(pg, pgsize), {
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
export function GetAssetTypeDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidAssetType(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutAssetTypeDataById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidAssetType(id), body);
}

//------- Delete-API

export function DeleteAssetTypeDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidAssetType(id));
}

//----------Save-Post-API
export function PostListingForAssetType(body) {
  return axios.post(apiurlAssetType, body);
}

//----------Upload File

let apiforupload = apiUrl + "/common/Uploads";

export function PostListingForFileUpload(body) {
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
