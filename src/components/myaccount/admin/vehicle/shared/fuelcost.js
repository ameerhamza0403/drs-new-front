import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VVehicle Fuel Cost*********************** */
 let apiurlVehiclefuelcost= apiUrl + '/masterdata/Vehiclefuelcosts';
// let apiurlVehiclefuelcost= 'https://reqres.in/api/users/2';

function ApiwithidVehiclefuelcost(Id) {
    return `${apiurlVehiclefuelcost}/${Id}`;
  }

//-------- GetAPi
export function GetListingForVehiclefuelcost() {
    return axios.get(apiurlVehiclefuelcost,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehiclefuelcostDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehiclefuelcost(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutVehiclefuelcostDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehiclefuelcost(id),body)

}

//------- Delete-API

export function DeleteVehiclefuelcostDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehiclefuelcost(id))

}

//----------Save-Post-API
export function PostListingForVehiclefuelcost(body) {
    return axios.post(apiurlVehiclefuelcost,body)

}
