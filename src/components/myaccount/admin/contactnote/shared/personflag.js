import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlPersonflag= apiUrl + '/masterdata/PersonFlags';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidPersonflag(Id) {
    return `${apiurlPersonflag}/${Id}`;
  }

//-------- GetAPi
export function GetListingForPersonflag() {
    return axios.get(apiurlPersonflag, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetPersonflagDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidPersonflag(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutPersonflagDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidPersonflag(id),body)

}

//------- Delete-API

export function DeletePersonflagDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidPersonflag(id))

}

//----------Save-Post-API
export function PostListingForPersonflag(body) {
    return axios.post(apiurlPersonflag,body)

}