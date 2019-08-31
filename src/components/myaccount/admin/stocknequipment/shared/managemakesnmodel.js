import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlManageMakesnModel= apiUrl + '/masterdata/ManageMakesnModels';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidManageMakesnModel(Id) {
    return `${apiurlManageMakesnModel}/${Id}`;
  }

  function ApiwithbyPgManageMakesnModel(Pg,PgSize) {
    return `${apiurlManageMakesnModel}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForManageMakesnModel(pg,pgsize) {
    return axios.get(ApiwithbyPgManageMakesnModel(pg,pgsize),
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
export function GetManageMakesnModelDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidManageMakesnModel(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutManageMakesnModelDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidManageMakesnModel(id),body)

}

//------- Delete-API

export function DeleteManageMakesnModelDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidManageMakesnModel(id))

}

//----------Save-Post-API
export function PostListingForManageMakesnModel(body) {
    return axios.post(apiurlManageMakesnModel,body)

}
