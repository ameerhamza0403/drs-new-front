import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlJobflag= apiUrl + '/masterdata/JobFlags';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidJobflag(Id) {
    return `${apiurlJobflag}/${Id}`;
  }

  function ApiwithbyPgJobflag(Pg,PgSize) {
    return `${apiurlJobflag}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForJobflag(pg,pgsize) {
    return axios.get(ApiwithbyPgJobflag(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetJobflagDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidJobflag(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutJobflagDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidJobflag(id),body)

}

//------- Delete-API

export function DeleteJobflagDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidJobflag(id))

}

//----------Save-Post-API
export function PostListingForJobflag(body) {
    return axios.post(apiurlJobflag,body)

}
