import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************StorageLocation*********************** */
let apiurlStorageLocation= apiUrl + '/masterdata/StorageLocations';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidStorageLocation(Id) {
    return `${apiurlStorageLocation}/${Id}`;
  }

  function ApiwithbyPgStorageLocation(Pg,PgSize) {
    return `${apiurlStorageLocation}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForStorageLocation(pg,pgsize) {
    return axios.get(ApiwithbyPgStorageLocation(pg,pgsize),
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
export function GetStorageLocationDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidStorageLocation(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutStorageLocationDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidStorageLocation(id),body)

}

//------- Delete-API

export function DeleteStorageLocationDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidStorageLocation(id))

}

//----------Save-Post-API
export function PostListingForStorageLocation(body) {
    return axios.post(apiurlStorageLocation,body)

}

//----------Upload File

let apiforupload=apiUrl + '/common/Uploads';


export function PostListingForFileUpload(body) {
  return axios.post(apiforupload,body,
    {headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Expose-Headers': '*',
       }}
   )
}


