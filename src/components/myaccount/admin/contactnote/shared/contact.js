import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlContactgroup= apiUrl + '/masterdata/ContactGroups';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidContactgroup(Id) {
    return `${apiurlContactgroup}/${Id}`;
  }

//-------- GetAPi
export function GetListingForContactGroup() {
    return axios.get(apiurlContactgroup, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetContactGroupDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidContactgroup(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutContactGroupDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidContactgroup(id),body)

}

//------- Delete-API

export function DeleteContactGroupDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidContactgroup(id))

}

//----------Save-Post-API
export function PostListingForContactGroup(body) {
    return axios.post(apiurlContactgroup,body)

}