import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************File Group*********************** */
let apiurlFileLibrary= apiUrl + '/masterdata/FileLibrary';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlFileLibraryall= apiUrl + '/masterdata/FileLibrary/0/0';



function ApiwithidFileLibrary(Id) {
    return `${apiurlFileLibrary}/${Id}`;
  }

  function ApiwithbyPgFileLibrary(Pg,PgSize) {
    return `${apiurlFileLibrary}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForFileLibrary(pg,pgsize) {
    return axios.get(ApiwithbyPgFileLibrary(pg,pgsize),
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
export function GetAllListingForFileLibrary() {
  return axios.get(apiurlFileLibraryall,
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
export function GetFileLibraryDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidFileLibrary(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutFileLibraryDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidFileLibrary(id),body)

}

//------- Delete-API

export function DeleteFileLibraryDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidFileLibrary(id))

}

//----------Save-Post-API
export function PostListingForFileLibrary(body) {
    return axios.post(apiurlFileLibrary,body)

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
