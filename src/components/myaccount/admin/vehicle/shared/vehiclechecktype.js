import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VehicleChecktype*********************** */
 let apiurlVehicleChecktype= apiUrl + '/masterdata/VehicleCheckTypes';
// let apiurlVehicleChecktype= 'https://reqres.in/api/users/2';

function ApiwithidVehicleChecktype(Id) {
    return `${apiurlVehicleChecktype}/${Id}`;
  }

  function ApiwithpagVehicleChecktype(pg,pgsize) {
    return `${apiurlVehicleChecktype}/${pg}/${pgsize}`;
  }


//-------- GetAPi
export function GetListingForVehicleChecktype(pg,pgsize) {
    return axios.get(ApiwithpagVehicleChecktype(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Checktype': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehicleChecktypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehicleChecktype(id),
             {headers: {
                 'Content-Checktype': 'application/json',
                }}
            )

}

export function PutVehicleChecktypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehicleChecktype(id),body)

}

//------- Delete-API

export function DeleteVehicleChecktypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehicleChecktype(id))

}

//----------Save-Post-API
export function PostListingForVehicleCheckType(body) {
    return axios.post(apiurlVehicleChecktype,body)

}

