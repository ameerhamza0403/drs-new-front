import { apiUrl } from "..//..//..//..//..//config.json";
import axios from "axios";

/* *************************VehicleCheck Check*********************** */
let apiurlVehicleCheck = apiUrl + "/masterdata/VehicleChecks";
// let apiurlVehicleCheck= 'https://reqres.in/api/users/2';
let apiurlVehicleCheckByTypeID =
  apiUrl + "/masterdata/VehicleCheckes/bychecktype";
function ApiwithidVehicleCheck(Id) {
  return `${apiurlVehicleCheck}/${Id}`;
}

function ApiwithidVehicleCheckType(Id) {
  return `${apiurlVehicleCheckByTypeID}/${Id}`;
}

function ApibyPageVehicleCheckType(Pg, PgSize) {
  return `${apiurlVehicleCheck}/${Pg}/${PgSize}`;
}

//-------- GetAPi
export function GetPagListingForVehicleCheckType(pg, pgsize) {
  return axios.get(ApibyPageVehicleCheckType(pg, pgsize), {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}

//-------- GetAPi
export function GetListingForVehicleCheck() {
  return axios.get(apiurlVehicleCheck, {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Check": "application/json"
    }
  });
}

//---------Edit APi



export function GetVehicleCheckDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidVehicleCheck(id), {
    headers: {
      "Content-Check": "application/json"
    }
  });
}

export function PutVehicleCheckDataById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidVehicleCheck(id), body);
}

//------- Delete-API

export function DeleteVehicleCheckDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidVehicleCheck(id));
}

//----------Save-Post-API
export function PostListingForVehicleCheck(body) {
  return axios.post(apiurlVehicleCheck, body);
}

//-------------Search by ID -----
function ApiwithidVehicleCheckedit(Id,pg,pgsize) {
  return `${apiurlVehicleCheck}/${Id}/${pg}/${pgsize}`;
}


export function GetVehicleCheckDataByTypeId(id,pg,pgsize) {
  // console.log(id)
  return axios.get(ApiwithidVehicleCheckedit(id,pg,pgsize), {
    headers: {
      "Content-Check": "application/json"
    }
  });
}
