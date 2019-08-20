import { apiUrl } from "..//..//..//..//..//config.json";
import axios from "axios";

/* *************************DriverBeh Type*********************** */
let apiurlDriverBeh = apiUrl + "/masterdata/DrvBehKPIs";
let apiurlDriverBehbyresource =
  apiUrl + "/masterdata/DrvBehKPISettings/byresourcegroup";
let apiurlDriverBehSet = apiUrl + "/masterdata/DrvBehKPISettings";
// let apiurlDriverBeh= 'https://reqres.in/api/users/2';

function ApiwithidDriverBeh(Id) {
  return `${apiurlDriverBeh}/${Id}`;
}

function ApiwithidDriverBehbyResID(Id) {
  return `${apiurlDriverBehbyresource}/${Id}`;
}

function ApiwithidDriverBehSet(Id) {
  return `${apiurlDriverBehSet}/${Id}`;
}

//-------- GetAPi
export function GetListingForDriverBeh() {
  return axios.get(apiurlDriverBeh, {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}

//---------Edit APi
export function GetDriverBehDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidDriverBeh(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutDriverBehDataById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidDriverBeh(id), body);
}

//------- Delete-API

export function DeleteDriverBehDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidDriverBeh(id));
}

//----------Save-Post-API
export function PostListingForDriverBeh(body) {
  return axios.post(apiurlDriverBeh, body);
}

//-------- Get By Resource ID-----

export function GetDriverBehDataByResId(id) {
  // console.log(id)
  return axios.get(ApiwithidDriverBehbyResID(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

//-------- GetAPi
export function GetListingForDriverBehSet() {
  return axios.get(apiurlDriverBehSet, {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}

//---------Edit APi
export function GetDriverBehSetDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidDriverBehSet(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutDriverBehDataSetById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidDriverBehSet(id), body);
}

//------- Delete-API

export function DeleteDriverBehSetDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidDriverBehSet(id));
}

//----------Save-Post-API
export function PostListingForDriverBehSet(body) {
  return axios.post(apiurlDriverBehSet, body);
}
