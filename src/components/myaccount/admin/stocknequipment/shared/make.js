import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Make*********************** */
let apiurlMake= apiUrl + '/masterdata/Makes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidMake(Id) {
    return `${apiurlMake}/${Id}`;
  }

  function ApiwithbyPgMake(Pg,PgSize) {
    return `${apiurlMake}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForMake(pg,pgsize) {
    return axios.get(ApiwithbyPgMake(pg,pgsize),
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
export function GetMakeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidMake(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutMakeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidMake(id),body)

}

//------- Delete-API

export function DeleteMakeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidMake(id))

}

//----------Save-Post-API
export function PostListingForMake(body) {
    return axios.post(apiurlMake,body)

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


