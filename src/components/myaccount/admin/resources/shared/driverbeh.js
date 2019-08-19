import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************DriverBeh Type*********************** */
 let apiurlDriverBeh= apiUrl + '/masterdata/DrvBehKPIs';
// let apiurlDriverBeh= 'https://reqres.in/api/users/2';

function ApiwithidDriverBeh(Id) {
    return `${apiurlDriverBeh}/${Id}`;
  }

//-------- GetAPi
export function GetListingForDriverBeh() {
    return axios.get(apiurlDriverBeh,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetDriverBehDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidDriverBeh(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutDriverBehDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidDriverBeh(id),body)

}

//------- Delete-API

export function DeleteDriverBehDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidDriverBeh(id))

}

//----------Save-Post-API
export function PostListingForDriverBeh(body) {
    return axios.post(apiurlDriverBeh,body)

}

