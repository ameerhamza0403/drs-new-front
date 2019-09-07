import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************VendorGroup*********************** */
let apiurlVendorGroup= apiUrl + '/masterdata/VendorGroups';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidVendorGroup(Id) {
    return `${apiurlVendorGroup}/${Id}`;
  }

  function ApiwithbyPgVendorGroup(Pg,PgSize) {
    return `${apiurlVendorGroup}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForVendorGroup(pg,pgsize) {
    return axios.get(ApiwithbyPgVendorGroup(pg,pgsize),
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
export function GetVendorGroupDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidVendorGroup(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutVendorGroupDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidVendorGroup(id),body)

}

//------- Delete-API

export function DeleteVendorGroupDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidVendorGroup(id))

}

//----------Save-Post-API
export function PostListingForVendorGroup(body) {
    return axios.post(apiurlVendorGroup,body)

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


