import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VehicleAttribute Type*********************** */
 let apiurlVehicleAttribute= apiUrl + '/masterdata/VehicleAttributes';
// let apiurlVehicleAttribute= 'https://reqres.in/api/users/2';

function ApiwithidVehicleAttribute(Id) {
    return `${apiurlVehicleAttribute}/${Id}`;
  }



  function ApibyPageVehicleAttribute(Pg, PgSize) {
    return `${apiurlVehicleAttribute}/${Pg}/${PgSize}`;
  }

  //-------- GetAPi
  export function GetPagListingForVehicleAttribute(pg, pgsize) {
    return axios.get(ApibyPageVehicleAttribute(pg, pgsize), {
      headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  }


//-------- GetAPi
export function GetListingForVehicleAttribute() {
    return axios.get(apiurlVehicleAttribute,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetVehicleAttributeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVehicleAttribute(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutVehicleAttributeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVehicleAttribute(id),body)

}

//------- Delete-API

export function DeleteVehicleAttributeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVehicleAttribute(id))

}

//----------Save-Post-API
export function PostListingForVehicleAttribute(body) {
    return axios.post(apiurlVehicleAttribute,body)

}

