import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************File Group*********************** */
let apiurlFileGroup= apiUrl + '/masterdata/PredefinedItems';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlFileGroupall= apiUrl + '/masterdata/PredefinedItems/0/0';



function ApiwithidFileGroup(Id) {
    return `${apiurlFileGroup}/${Id}`;
  }

  function ApiwithbyPgFileGroup(Pg,PgSize) {
    return `${apiurlFileGroup}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForFileGroup(pg,pgsize) {
    return axios.get(ApiwithbyPgFileGroup(pg,pgsize),
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
export function GetAllListingForFileGroup() {
  return axios.get(apiurlFileGroupall,
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
export function GetFileGroupDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidFileGroup(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutFileGroupDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidFileGroup(id),body)

}

//------- Delete-API

export function DeleteFileGroupDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidFileGroup(id))

}

//----------Save-Post-API
export function PostListingForFileGroup(body) {
    return axios.post(apiurlFileGroup,body)

}
