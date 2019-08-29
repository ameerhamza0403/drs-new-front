import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Tax Code*********************** */
let apiurlDoorType= apiUrl + '/masterdata/DoorTypes';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlDoorTypeall= apiUrl + '/masterdata/DoorTypes/0/0';



function ApiwithidDoorType(Id) {
    return `${apiurlDoorType}/${Id}`;
  }

  function ApiwithbyPgDoorType(Pg,PgSize) {
    return `${apiurlDoorType}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForDoorType(pg,pgsize) {
    return axios.get(ApiwithbyPgDoorType(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//-------- GetAPiAll
export function GetAllListingForDoorType() {
  return axios.get(apiurlDoorTypeall,
           {headers: {
               //"Authorization": authIt,
               //"accept": "application/json",
               //"Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               'Access-Control-Expose-Headers': '*',
              }}
          )

}

//---------Edit APi
export function GetDoorTypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidDoorType(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutDoorTypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidDoorType(id),body)

}

//------- Delete-API

export function DeleteDoorTypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidDoorType(id))

}

//----------Save-Post-API
export function PostListingForDoorType(body) {
    return axios.post(apiurlDoorType,body)

}
