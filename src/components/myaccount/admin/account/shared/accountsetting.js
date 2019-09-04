import { apiUrl,accountId } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlAccountSetting= apiUrl + '/masterdata/AccountSettings';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidAccountSetting(Id) {
    return `${apiurlAccountSetting}/${Id}`;
  }

  function ApiwithbyPgAccountSetting(Pg,PgSize) {
    return `${apiurlAccountSetting}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForAccountSetting(pg,pgsize) {
    return axios.get(ApiwithbyPgAccountSetting(pg,pgsize),
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
export function GetAccountSettingDataById() {
    // console.log(id)
    return axios.get(ApiwithidAccountSetting(accountId),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutAccountSettingDataById(body) {
    // console.log(id)
    return axios.put(ApiwithidAccountSetting(accountId),body)

}

//------- Delete-API

export function DeleteAccountSettingDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidAccountSetting(id))

}

//----------Save-Post-API
export function PostListingForAccountSetting(body) {
    return axios.post(apiurlAccountSetting,body)

}
