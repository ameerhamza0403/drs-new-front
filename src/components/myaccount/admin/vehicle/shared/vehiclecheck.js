import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VehicleCheck Check*********************** */
 let apiurlVehicleCheck= apiUrl + '/masterdata/VehicleCheckes';
// let apiurlVehicleCheck= 'https://reqres.in/api/users/2';

function ApiwithidVehicleCheck(Id) {
    return `${apiurlVehicleCheck}/${Id}`;
  }

//-------- GetAPi
export function GetListingForVehicleCheck() {
    return axios.get(apiurlVehicleCheck,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Check': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehicleCheckDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehicleCheck(id),
             {headers: {
                 'Content-Check': 'application/json',
                }}
            )

}

export function PutVehicleCheckDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehicleCheck(id),body)

}

//------- Delete-API

export function DeleteVehicleCheckDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehicleCheck(id))

}

//----------Save-Post-API
export function PostListingForVehicleCheck(body) {
    return axios.post(apiurlVehicleCheck,body)

}

