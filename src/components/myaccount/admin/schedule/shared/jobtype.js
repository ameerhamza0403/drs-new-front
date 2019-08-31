import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlJobType= apiUrl + '/masterdata/JobTypes';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidJobType(Id) {
    return `${apiurlJobType}/${Id}`;
  }

  function ApiwithbyPgJobType(Pg,PgSize) {
    return `${apiurlJobType}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForJobType(pg,pgsize) {
    return axios.get(ApiwithbyPgJobType(pg,pgsize),
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
export function GetJobTypeDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidJobType(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutJobTypeDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidJobType(id),body)

}

//------- Delete-API

export function DeleteJobTypeDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidJobType(id))

}

//----------Save-Post-API
export function PostListingForJobType(body) {
    return axios.post(apiurlJobType,body)

}
