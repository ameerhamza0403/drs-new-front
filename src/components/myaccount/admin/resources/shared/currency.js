import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************currency Type*********************** */
 let apiurlcurrency= apiUrl + '/masterdata/Currencies';

// let apiurlcurrency= 'https://reqres.in/api/users/2'; //Fake Api Testing

function Apiwithidcurrency(Id) {
    return `${apiurlcurrency}/${Id}`;
  }

//-------- GetAPi
export function GetListingForcurrency() {
    return axios.get(apiurlcurrency, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetcurrencyDataById(id) {
    // console.log(id)
    return axios.get(Apiwithidcurrency(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutcurrencyDataById(id,body) {
    // console.log(id)
    return axios.put(Apiwithidcurrency(id),body)

}

//------- Delete-API

export function DeletecurrencyDataById(id) {
    // console.log(id)
    return axios.delete(Apiwithidcurrency(id))

}

//----------Save-Post-API
export function PostListingForcurrency(body) {
    return axios.post(apiurlcurrency,body)

}

