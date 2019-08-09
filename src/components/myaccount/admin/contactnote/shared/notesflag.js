import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlNoteflag= apiUrl + '/masterdata/NoteFlags';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidNoteflag(Id) {
    return `${apiurlNoteflag}/${Id}`;
  }

//-------- GetAPi
export function GetListingForNoteflag() {
    return axios.get(apiurlNoteflag, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetNoteflagDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidNoteflag(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutNoteflagDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidNoteflag(id),body)

}

//------- Delete-API

export function DeleteNoteflagDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidNoteflag(id))

}

//----------Save-Post-API
export function PostListingForNoteflag(body) {
    return axios.post(apiurlNoteflag,body)

}