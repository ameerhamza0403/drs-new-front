import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlProductCategory= apiUrl + '/masterdata/ProductCategories';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidProductCategory(Id) {
    return `${apiurlProductCategory}/${Id}`;
  }

  function ApiwithbyPgProductCategory(Pg,PgSize) {
    return `${apiurlProductCategory}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForProductCategory(pg,pgsize) {
    return axios.get(ApiwithbyPgProductCategory(pg,pgsize),
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
export function GetProductCategoryDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidProductCategory(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutProductCategoryDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidProductCategory(id),body)

}

//------- Delete-API

export function DeleteProductCategoryDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidProductCategory(id))

}

//----------Save-Post-API
export function PostListingForProductCategory(body) {
    return axios.post(apiurlProductCategory,body)

}
