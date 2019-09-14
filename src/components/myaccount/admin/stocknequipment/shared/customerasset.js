import { apiUrl } from "..//..//..//..//..//config.json";
import axios from "axios";

/* *************************CustomerAsset*********************** */
let apiurlCustomerAsset = apiUrl + "/masterdata/CustomerAssets";
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidCustomerAsset(Id) {
  return `${apiurlCustomerAsset}/${Id}`;
}

function ApiwithbyPgCustomerAsset(Pg, PgSize) {
  return `${apiurlCustomerAsset}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetListingForCustomerAsset(pg, pgsize) {
  return axios.get(ApiwithbyPgCustomerAsset(pg, pgsize), {
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
export function GetCustomerAssetDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidCustomerAsset(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutCustomerAssetDataById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidCustomerAsset(id), body);
}

//------- Delete-API

export function DeleteCustomerAssetDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidCustomerAsset(id));
}

//----------Save-Post-API
export function PostListingForCustomerAsset(body) {
  return axios.post(apiurlCustomerAsset, body);
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
