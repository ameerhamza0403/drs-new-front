import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Model*********************** */
let apiurlModel= apiUrl + '/masterdata/Models';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidModel(Id) {
    return `${apiurlModel}/${Id}`;
  }

  function ApiwithbyPgModel(Pg,PgSize) {
    return `${apiurlModel}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForModel(pg,pgsize) {
    return axios.get(ApiwithbyPgModel(pg,pgsize),
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
export function GetModelDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidModel(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutModelDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidModel(id),body)

}

//------- Delete-API

export function DeleteModelDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidModel(id))

}

//----------Save-Post-API
export function PostListingForModel(body) {
    return axios.post(apiurlModel,body)

}
