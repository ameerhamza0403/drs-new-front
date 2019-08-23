import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlJobcategory= apiUrl + '/masterdata/JobCategories';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidJobcategory(Id) {
    return `${apiurlJobcategory}/${Id}`;
  }

  function ApiwithbyPgJobcategory(Pg,PgSize) {
    return `${apiurlJobcategory}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForJobcategory(pg,pgsize) {
    return axios.get(ApiwithbyPgJobcategory(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetJobcategoryDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidJobcategory(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutJobcategoryDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidJobcategory(id),body)

}

//------- Delete-API

export function DeleteJobcategoryDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidJobcategory(id))

}

//----------Save-Post-API
export function PostListingForJobcategory(body) {
    return axios.post(apiurlJobcategory,body)

}
