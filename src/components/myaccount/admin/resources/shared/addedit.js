import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************AddEdit*********************** */
 let apiurlAddEdit= apiUrl + '/masterdata/Resources';

// let apiurlAddEdit= 'https://reqres.in/api/users/2'; //Fake Api Testing

function ApiwithidAddEdit(Id) {
    return `${apiurlAddEdit}/${Id}`;
  }

//-------- GetAPi
export function GetListingForAddEdit() {
    return axios.get(apiurlAddEdit, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetAddEditDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidAddEdit(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutAddEditDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidAddEdit(id),body)

}

//------- Delete-API

export function DeleteAddEditDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidAddEdit(id))

}

//----------Save-Post-API
export function PostListingForAddEdit(body) {
    return axios.post(apiurlAddEdit,body)

}

