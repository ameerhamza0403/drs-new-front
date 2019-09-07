import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************businessPartner*********************** */
let apiurlbusinessPartner= apiUrl + '/masterdata/BusinessPartners';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidbusinessPartner(Id) {
    return `${apiurlbusinessPartner}/${Id}`;
  }

  function ApiwithbyPgbusinessPartner(Pg,PgSize) {
    return `${apiurlbusinessPartner}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForbusinessPartner(pg,pgsize) {
    return axios.get(ApiwithbyPgbusinessPartner(pg,pgsize),
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
export function GetbusinessPartnerDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidbusinessPartner(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutbusinessPartnerDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidbusinessPartner(id),body)

}

//------- Delete-API

export function DeletebusinessPartnerDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidbusinessPartner(id))

}

//----------Save-Post-API
export function PostListingForbusinessPartner(body) {
    return axios.post(apiurlbusinessPartner,body)

}

//----------Upload File

let apiforupload=apiUrl + '/common/Uploads';


export function PostListingForFileUpload(body) {
  return axios.post(apiforupload,body,
    {headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Expose-Headers': '*',
       }}
   )
}


