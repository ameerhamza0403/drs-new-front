import { apiUrl } from "..//..//..//..//..//config.json";
import axios from "axios";

/* *************************VVehicle Fuel Cost*********************** */
let apiurlVehiclemanage = apiUrl + "/masterdata/Vehicles";
// let apiurlVehiclemanage= 'https://reqres.in/api/users/2';

function ApiwithidVehiclemanage(Id) {
  return `${apiurlVehiclemanage}/${Id}`;
}

function ApibyPageVehiclemanage(Pg, PgSize) {
  return `${apiurlVehiclemanage}/${Pg}/${PgSize}`;
}



//-------- GetAPi
export function GetListingForVehiclemanage(pg, pgsize) {
  return axios.get(ApibyPageVehiclemanage(pg, pgsize), {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}

//---------Edit APi
export function GetVehiclemanageDataById(id) {
  // console.log(id)
  return axios.get(ApiwithidVehiclemanage(id), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function PutVehiclemanageDataById(id, body) {
  // console.log(id)
  return axios.put(ApiwithidVehiclemanage(id), body);
}

//------- Delete-API

export function DeleteVehiclemanageDataById(id) {
  // console.log(id)
  return axios.delete(ApiwithidVehiclemanage(id));
}

//----------Save-Post-API
export function PostListingForVehiclemanage(body) {
  return axios.post(apiurlVehiclemanage, body);
}

//-----------Tracking Device-------

let urlfortrackingdevice = apiUrl + "/masterdata/TrackingDevices/0/0";
export function GetTrackingDeviceData() {
  return axios.get(urlfortrackingdevice, {
    headers: {
      //"Authorization": authIt,
      //"accept": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}
