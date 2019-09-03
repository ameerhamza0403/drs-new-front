import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VehicleType Type*********************** */
 let apiurlVehicleType= apiUrl + '/masterdata/VehicleTypes';
// let apiurlVehicleType= 'https://reqres.in/api/users/2';

function ApiwithidVehicleType(Id) {
    return `${apiurlVehicleType}/${Id}`;
  }

//-------- GetAPi
export function GetListingForVehicleType() {
    return axios.get(apiurlVehicleType,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehicleTypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehicleType(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutVehicleTypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehicleType(id),body)

}

//------- Delete-API

export function DeleteVehicleTypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehicleType(id))

}

//----------Save-Post-API
export function PostListingForVehicleType(body) {
    return axios.post(apiurlVehicleType,body)

}

