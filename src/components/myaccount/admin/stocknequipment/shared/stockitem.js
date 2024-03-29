import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************StockItem*********************** */
let apiurlStockItem= apiUrl + '/masterdata/Items';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidStockItem(Id) {
    return `${apiurlStockItem}/${Id}`;
  }

  function ApiwithbyPgStockItem(Pg,PgSize) {
    return `${apiurlStockItem}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForStockItem(pg,pgsize) {
    return axios.get(ApiwithbyPgStockItem(pg,pgsize),
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
export function GetStockItemDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidStockItem(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutStockItemDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidStockItem(id),body)

}

//------- Delete-API

export function DeleteStockItemDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidStockItem(id))

}

//----------Save-Post-API
export function PostListingForStockItem(body) {
    return axios.post(apiurlStockItem,body)

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


