import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlAccount= apiUrl + '/masterdata/Accounts';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidAccount(Id) {
    return `${apiurlAccount}/${Id}`;
  }

  function ApiwithbyPgAccount(Pg,PgSize) {
    return `${apiurlAccount}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForAccount(pg,pgsize) {
    return axios.get(ApiwithbyPgAccount(pg,pgsize),
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
export function GetAccountDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidAccount(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutAccountDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidAccount(id),body)

}

//------- Delete-API

export function DeleteAccountDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidAccount(id))

}

//----------Save-Post-API
export function PostListingForAccount(body) {
    return axios.post(apiurlAccount,body)

}
