import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VehicleGroups Type*********************** */
 let apiurlVehicleGroups= apiUrl + '/masterdata/VehicleGroups';
// let apiurlVehicleGroups= 'https://reqres.in/api/users/2';

function ApiwithidVehicleGroups(Id) {
    return `${apiurlVehicleGroups}/${Id}`;
  }

  function ApibyPageVehicleGroup(Pg, PgSize) {
    return `${apiurlVehicleGroups}/${Pg}/${PgSize}`;
  }

  //-------- GetAPi
  export function GetPagListingForVehicleGroup(pg, pgsize) {
    return axios.get(ApibyPageVehicleGroup(pg, pgsize), {
      headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  }

//-------- GetAPi
export function GetListingForVehicleGroups() {
    return axios.get(apiurlVehicleGroups,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehicleGroupsDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehicleGroups(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutVehicleGroupsDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehicleGroups(id),body)

}

//------- Delete-API

export function DeleteVehicleGroupsDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehicleGroups(id))

}

//----------Save-Post-API
export function PostListingForVehicleGroups(body) {
    return axios.post(apiurlVehicleGroups,body)

}

