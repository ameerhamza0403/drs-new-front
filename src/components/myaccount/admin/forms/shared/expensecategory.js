import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlExpenseCategory= apiUrl + '/masterdata/ExpenseCategories';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidExpenseCategory(Id) {
    return `${apiurlExpenseCategory}/${Id}`;
  }

  function ApiwithbyPgExpenseCategory(Pg,PgSize) {
    return `${apiurlExpenseCategory}/${Pg}/${PgSize}`;
  }

//-------- GetAPi 
export function GetListingForExpenseCategory(pg,pgsize) {
    return axios.get(ApiwithbyPgExpenseCategory(pg,pgsize),
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
export function GetExpenseCategoryDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidExpenseCategory(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutExpenseCategoryDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidExpenseCategory(id),body)

}

//------- Delete-API

export function DeleteExpenseCategoryDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidExpenseCategory(id))

}

//----------Save-Post-API
export function PostListingForExpenseCategory(body) {
    return axios.post(apiurlExpenseCategory,body)

}
