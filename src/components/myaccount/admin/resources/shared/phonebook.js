import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Absence Type*********************** */
 let apiurlPhoneBook= apiUrl + '/masterdata/PhoneBooks';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidPhonebook(Id) {
    return `${apiurlPhoneBook}/${Id}`;
  }


  function ApiPagingPhonebook(PG,PGSIZE) {
    return `${apiurlPhoneBook}/${PG}/${PGSIZE}`;
  }

//-------- GetAPi
export function GetListingpgForPhonebook(pg, pgsize) {
    return axios.get(ApiPagingPhonebook(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//-------- GetAPi
export function GetListingForPhoneBook() {
    return axios.get(apiurlPhoneBook,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetPhoneBookDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidPhonebook(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutPhoneBookDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidPhonebook(id),body)

}

//------- Delete-API

export function DeletePhoneBookDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidPhonebook(id))

}

//----------Save-Post-API
export function PostListingForPhoneBook(body) {
    return axios.post(apiurlPhoneBook,body)

}

