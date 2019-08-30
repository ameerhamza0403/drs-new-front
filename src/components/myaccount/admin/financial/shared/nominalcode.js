import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlNominalCode= apiUrl + '/masterdata/NominalCodes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidNominalCode(Id) {
    return `${apiurlNominalCode}/${Id}`;
  }

  function ApiwithbyPgNominalCode(Pg,PgSize) {
    return `${apiurlNominalCode}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForNominalCode(pg,pgsize) {
    return axios.get(ApiwithbyPgNominalCode(pg,pgsize),
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
export function GetNominalCodeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidNominalCode(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutNominalCodeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidNominalCode(id),body)

}

//------- Delete-API

export function DeleteNominalCodeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidNominalCode(id))

}

//----------Save-Post-API
export function PostListingForNominalCode(body) {
    return axios.post(apiurlNominalCode,body)

}
